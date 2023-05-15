import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import User from "@models/user";
import { connectToDB } from "@utils/database";

const googleId = process.env.GOOGLE_ID ?? "";
const googleSecret = process.env.GOOGLE_CLIENT_SECRET ?? "";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: googleId,
      clientSecret: googleSecret,
    }),
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });

      if (sessionUser) {
        session.user.id = sessionUser._id.toString();
      }

      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();

        // check if user already exists
        const userExists =
          profile?.email && (await User.findOne({ email: profile.email }));

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: profile?.email && profile.email,
            username:
              profile?.name && profile.name.replace(" ", "").toLowerCase(),
            image: profile?.image,
          });
        }

        return true;
      } catch (error) {
        console.log(`Error checking if user exists: ${error}`);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };


//Se não der certo, tentar usar firebase