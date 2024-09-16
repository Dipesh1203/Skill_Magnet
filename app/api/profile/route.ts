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
    // Parse request body
    const body = await request.json();
    console.log(body);

    // Connect to database
    await dbConnect();
    console.log("===============");
    console.log("===============", body);

    // Check if the user (owner) exists
    const user: IUser | null = await User.findOne({
      email: body.email,
    }).lean<IUser>();
    const profile = await Profile.find({ owner: body.owner });
    if (!user) {
      return NextResponse.json(
        { error: "User not found. Please register first." },
        { status: 404 }
      );
    }
    console.log("=================");
    console.log(profile);
    console.log("=================");

    if (profile.length > 0) {
      return NextResponse.json(
        { error: "profile is already created by thi user" },
        { status: 404 }
      );
    }
    const data = {
      ...body,
      owner: user._id,
    };
    // Create a new profile
    const newProfile = new Profile(data);
    await newProfile.save();
    console.log("=============-", newProfile);

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
    console.log("==================================");

    // Parse request body
    const body = await request.json();
    console.log(body);

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
