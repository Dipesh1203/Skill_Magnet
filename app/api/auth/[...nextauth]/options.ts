import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User, { IUser } from "../../../models/user.model";
import { Types } from "mongoose";

// Handle Google sign-in and user creation
async function handleGoogleSignIn(
  profile: any
): Promise<IUser & { _id: Types.ObjectId }> {
  const { sub: googleId, email, name } = profile;
  await dbConnect();
  try {
    let user = await User.findOne({ googleId });
    let data;

    if (!user) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        existingUser.googleId = googleId;
        existingUser.isGoogleUser = true;
        data = await existingUser.save(); // Save and assign to data
        return data as IUser & { _id: Types.ObjectId }; // Return the saved user
      }

      user = new User({
        username: email.split("@")[0],
        email,
        googleId,
        isGoogleUser: true,
        isVerified: true,
        isAcceptingMessages: true,
      });
      data = await user.save(); // Save and assign to data
    } else {
      user.email = email;
      user.username = name || user.username;
      data = await user.save(); // Save and assign to data
    }

    return data as IUser & { _id: Types.ObjectId }; // Return the saved user
  } catch (error) {
    console.error("Error in handleGoogleSignIn:", error);
    throw error;
  }
}

// NextAuth options configuration
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        identifier: {
          label: "Email",
          type: "text",
          placeholder: "Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter Password",
        },
      },
      async authorize(
        credentials: Record<"identifier" | "password", string> | undefined
      ): Promise<any> {
        if (!credentials) {
          throw new Error("No credentials provided");
        }

        await dbConnect();
        try {
          const user = await User.findOne({
            email: credentials.identifier,
          });

          if (!user) {
            throw new Error("No user found with this email or username");
          }

          if (!user.isVerified) {
            throw new Error("Please verify your account");
          }

          if (!user.password) {
            throw new Error("Invalid login method");
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error("Incorrect password");
          }

          return user;
        } catch (error: any) {
          throw new Error(error.message || "Authentication failed");
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === "google") {
        const dbUser = await handleGoogleSignIn(profile);
        user._id = dbUser._id.toString();
        user.isVerified = dbUser.isVerified;
        user.isAcceptingMessages = dbUser.isAcceptingMessages;
        user.username = dbUser.username;
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString(); // Ensure _id is stored as a string
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user._id = token._id; // Include _id from the token
        session.user.isVerified = token.isVerified;
        session.user.isAcceptingMessages = token.isAcceptingMessages;
        session.user.username = token.username;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
