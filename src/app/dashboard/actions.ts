import { auth, CognitoSession } from "@/auth";

export async function getSessionUserEmail(): Promise<string | null> {
  'use server';
  const session = await auth() as CognitoSession;
  const email = session.user?.email || null;
  return email;
}
