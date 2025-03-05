import NextAuth from "next-auth"
import Cognito from "next-auth/providers/cognito"
import { Session } from "@auth/core/types";

export interface CognitoSession extends Session {
  idToken?: string;
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Cognito],
  callbacks: {
    jwt({ token, user, account }) {
      if (user) { // User is available during sign-in
        token.idToken = account?.id_token
      }
      return token
    },
    session({ session, token }) {
      const idToken = typeof(token.idToken) == "string" ? token.idToken : undefined;
      (session as CognitoSession).idToken = idToken;
      return session
    },
  },
})
