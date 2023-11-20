import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from 'bcrypt';
import { NextResponse } from 'next/server';

export const authOptions = {

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" }
      },
      authorize: async (credentials) => {
        const response = await fetch('http://localhost:3000/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ UserID: credentials.username })
        });
        console.log("THIS IS THE API/USERS RESPONSE", response);

        if (!response.ok) {
          throw new Error("Response is not OK");
        }

        const data = await response.json();
        console.log("received username credential ", credentials.username);
        console.log("THIS IS DATA FROM RESPONSE", data, "thiS IS our password", credentials.password);

        if (data.Error) {
          console.log("ERRRRRORRRR");
          throw new Error(data.Error);
        }

        const isMatch = await compare(credentials?.password || '', data.password);
        console.log("MATCHHHHHHHHHHHHHHHHHHHHHH", isMatch);

        if (isMatch) {
          const user = { id: data.id, username: credentials.username }
          console.log("Next auth user", user.username);
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      // If the user object is available in the response, include it in the token
      if (user) {
        token.user = user;
      }
      return token;
    },

    async session({ session, token }) {
      // If the user object is available in the token, include it in the session
      if (token.user) {
        session.user = token.user;
        session.user.id = token.user.id; // Set session id from user.id
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
