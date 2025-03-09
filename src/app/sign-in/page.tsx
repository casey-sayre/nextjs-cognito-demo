import { signIn, auth } from "@/auth"
import { redirect } from 'next/navigation'

export default async function SignIn() {
  const session = await auth();
  if (session) {
    redirect('/dashboard')
  }

  return (
    <>
      <form
        action={async () => {
          "use server"
          await signIn("cognito");
        }}
      >
        <button type="submit" className="">Signin with Cognito</button>
      </form>
    </>
  );
}
