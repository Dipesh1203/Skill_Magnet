import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import schema from "./schema";
import User from "@/app/models/user.model";

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    const users = await User.find({});
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  await dbConnect();
  const body = await request.json();
  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  try {
    const existingUser = await User.findOne({ email: body.email });

    if (existingUser) {
      return NextResponse.json(
        { msg: "User already registered" },
        { status: 409 }
      );
    }

    const newUser = await User.create(body);
    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
// DELETE request handler to delete all users
export async function DELETE(request: NextRequest) {
  await dbConnect();

  try {
    // Delete all users from the database
    const result = await User.deleteMany({});

    return NextResponse.json(
      { msg: `${result.deletedCount} users deleted successfully` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete users" },
      { status: 500 }
    );
  }
}
