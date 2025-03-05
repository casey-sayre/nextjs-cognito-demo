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
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Signin with Cognito</button>
      </form>
    </>
  );
}
