import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// adding ! to the end -> client_id and client_secret can never be null
let CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
let CLIENT_SECRET = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!;

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    }),
  ],
  secret: process.env.SECRET,
  pages: {
    signIn: "/auth/signin", // Set the path to your custom login page
  },
});

export { handler as GET, handler as POST };
