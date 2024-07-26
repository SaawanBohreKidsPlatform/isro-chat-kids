import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

interface CustomUser extends User {
  id: string;
}

export const NEXT_AUTH_OPTIONS = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const user: CustomUser = { id: '1' };
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({token, user}: { token: JWT, user?: User }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({session, token}: { session: any, token: JWT }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
};

const handler = NextAuth(NEXT_AUTH_OPTIONS);

export { handler as GET, handler as POST}