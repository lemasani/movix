import { NextRequest, NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
  try {
    // Get the current user
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = clerkClient()
    // Get the user's metadata to retrieve the stored request token
    const user = await client.users.getUser(userId);
    const requestToken = user.privateMetadata.tmdbRequestToken as string;

    if (!requestToken) {
      return NextResponse.json(
        { error: "No request token found" },
        { status: 400 }
      );
    }

    // Step 3: Create a new session ID with the authorized request token
    const sessionId = await createTMDBSession(requestToken);
    console.log('Generated TMDB session ID:', sessionId);

    // Store the session ID in Clerk user metadata
    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: {
        tmdbSessionId: sessionId,
        tmdbAuthStatus: 'completed'
      },
    });

    // Redirect to your app's dashboard or home page
    return NextResponse.redirect(new URL('/', req.url));
    
  } catch (error) {
    console.error('Error in TMDB callback:', error);
    // Redirect to an error page
    return NextResponse.redirect(new URL('/auth-error', req.url));
  }
}

async function createTMDBSession(requestToken: string): Promise<string> {
  const response = await fetch("https://api.themoviedb.org/3/authentication/session/new", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      request_token: requestToken
    })
  });

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.session_id;
}