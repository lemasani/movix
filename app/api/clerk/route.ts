import { Webhook, EventIn } from "svix";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { headers } from 'next/headers';
import { clerkClient } from "@clerk/nextjs/server";

const webhookSecret = process.env.SVIX_WEBHOOK_SECRET;

interface ClerkWebhookEvent extends EventIn {
  type: string;
  data: {
    id: string;
    [key: string]: any;
  };
}

// TMDB API Functions
async function getTMDBRequestToken(): Promise<string> {
  const response = await fetch("https://api.themoviedb.org/3/authentication/token/new", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.request_token;
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

export async function POST(req: NextRequest) {
  // Get headers first
  const headersList = headers();
  const svixId = headersList.get("svix-id");
  const svixTimestamp = headersList.get("svix-timestamp");
  const svixSignature = headersList.get("svix-signature");
  
  // Debug logging
  console.log('Webhook Headers:', {
    'svix-id': svixId,
    'svix-timestamp': svixTimestamp,
    'svix-signature': svixSignature?.substring(0, 10) + '...',
    'content-type': headersList.get('content-type'),
  });

  // Early return if this is not a Clerk webhook call
  if (!svixId || !svixTimestamp || !svixSignature) {
    console.log('Not a Clerk webhook call - missing headers');
    return NextResponse.json({ success: true }); // Return 200 to avoid retries
  }

  // Verify webhook secret is configured
  if (!webhookSecret) {
    console.error("Missing SVIX_WEBHOOK_SECRET environment variable");
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  let payload: string;
  try {
    payload = await req.clone().text();
    console.log('Payload preview:', payload.substring(0, 100) + '...');
  } catch (err) {
    console.error("Error reading request body:", err);
    return NextResponse.json(
      { error: "Error reading request body" },
      { status: 400 }
    );
  }

  const svixHeaders = {
    "svix-id": svixId,
    "svix-timestamp": svixTimestamp,
    "svix-signature": svixSignature,
  };

  try {
    const wh = new Webhook(webhookSecret);
    const event = wh.verify(payload, svixHeaders) as ClerkWebhookEvent;
    console.log('Webhook verified successfully. Event type:', event.type);

    if (event.type === "user.created") {
      const userId = event.data.id;
      
      try {
        // Step 1: Generate TMDB request token
        const requestToken = await getTMDBRequestToken();
        console.log('Generated TMDB request token:', requestToken);

        // Step 2: Create authorization URL with redirect
        const tmdbAuthUrl = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${encodeURIComponent(`${process.env.NEXT_PUBLIC_APP_URL}/api/tmdb/callback`
        )}`;

        const client = clerkClient()
        // Store the request token in Clerk user metadata
        await client.users.updateUserMetadata(userId, {
          privateMetadata: { 
            tmdbRequestToken: requestToken,
            tmdbAuthStatus: 'pending' // Track the auth status
          },
        });
        
        console.log('Updated Clerk user metadata with TMDB request token');
        
        return NextResponse.json({ 
          success: true, 
          authUrl: tmdbAuthUrl 
        }, {
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate'
          }
        });
      } catch (error) {
        console.error('Error processing user.created event:', error);
        return NextResponse.json(
          { error: "Failed to process user creation" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ success: true });
    
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return NextResponse.json(
      { 
        error: "Webhook verification failed",
        details: err instanceof Error ? err.message : "Unknown error"
      },
      { status: 400 }
    );
  }
}