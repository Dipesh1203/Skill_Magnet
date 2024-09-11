import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import User from "@/app/models/user.model";

interface Props {
  params: { id: string };
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await User.findById(params.id);
    if (!user) {
      return NextResponse.json({ error: "User Not Found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const user = await User.findById(params.id);
    if (!user) {
      return NextResponse.json(
        { error: "User Not Found, please register" },
        { status: 404 }
      );
    }
    const updatedUser = await User.findByIdAndUpdate(params.id, body, {
      new: true,
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await User.findById(params.id);
    if (!user) {
      return NextResponse.json(
        { error: "User doesn't exist" },
        { status: 404 }
      );
    }
    await User.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
