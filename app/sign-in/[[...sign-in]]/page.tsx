import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return(

    <div className="container mx-auto flex justify-center items-center mt-20">
      <SignIn />
    </div>
  )
  
}