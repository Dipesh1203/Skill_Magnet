import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import { Profile } from "@/app/models/profile.model";
import dbConnect from "@/lib/dbConnect";
import User, { IUser } from "@/app/models/user.model";
// import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  await dbConnect();
  const user = await Profile.find(); // Assuming `request.user` contains the user information.
  return NextResponse.json(user);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    await dbConnect();

    // Check if the user (owner) exists
    const user: IUser | null = await User.findOne({
      email: body.email,
    }).lean<IUser>();
    const profile = await Profile.findOne({ owner: body.owner });
    if (!user) {
      return NextResponse.json(
        { error: "User not found. Please register first." },
        { status: 404 }
      );
    }

    if (profile && profile.length > 0) {
      return NextResponse.json(
        { error: "Profile is already created by the user" },
        { status: 400 } // Use 400 for "Bad Request" instead of 404
      );
    }

    const data = {
      ...body,
      owner: user._id,
    };
    console.log(data);
    // Create a new profile
    const newProfile = new Profile(data);
    await newProfile.save();

    // Respond with the created profile
    return NextResponse.json(newProfile);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
export async function PUT(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate request data
    const validation = schema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
    }

    // Database connection
    await dbConnect();

    // Assuming `request.user` contains user data
    // const userId = body.user._id;

    // // Assign owner ID to data
    // const data = { ...validation.data, owner: userId };

    // Create a new profile
    const newProfile = new Profile(validation.data);
    await newProfile.save();

    // Respond with the created profile
    return NextResponse.json(await Profile.findById({ _id: newProfile._id }));
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
export async function DELETE(request: NextRequest) {
  try {
    // Parse request body to get the email or profile ID
    const body = await request.json();

    // Connect to the database
    await dbConnect();

    // Check if the user (owner) exists
    const user = await User.findOne({
      email: body.email,
    }).lean();

    if (!user) {
      return NextResponse.json(
        { error: "User not found. Please register first." },
        { status: 404 }
      );
    }

    // Find and delete the profile based on owner ID or profile ID
    const deletedProfile = await Profile.findOneAndDelete({ owner: user._id });

    if (!deletedProfile) {
      return NextResponse.json(
        { error: "Profile not found or already deleted." },
        { status: 404 }
      );
    }

    // Return success response
    return NextResponse.json(
      { message: "Profile deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting profile:", error);
    return NextResponse.json(
      { error: "An error occurred while deleting the profile." },
      { status: 500 }
    );
  }
}
