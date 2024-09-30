import bcrypt from "bcryptjs";
import User from "@/app/models/user.model";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

// Create new user handler
export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const { username, email, password } = await req.json();

    // Connect to the database
    await dbConnect();

    // Check if the user already exists by email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isVerified: false, // Set default values
      isAcceptingMessages: true,
      isGoogleUser: false, // Regular signup, not Google
    });

    // Save the user to the database
    await newUser.save();

    // Return a success response
    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          isVerified: newUser.isVerified,
        },
      },
      { status: 201 }
    );
  } catch (err: any) {
    // Handle server errors
    return NextResponse.json(
      {
        message: "Error creating user",
        error: err.message,
      },
      { status: 500 }
    );
  }
}
