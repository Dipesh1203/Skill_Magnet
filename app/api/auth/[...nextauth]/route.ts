import NextAuthfrom from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { authOptions } from "./options";
import NextAuth from "next-auth/next";
// import bcrypt from "bcrypt";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
