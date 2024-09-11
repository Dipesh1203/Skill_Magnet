import { NextRequest, NextResponse } from "next/server";
import { Profile } from "@/app/models/profile.model";
import dbConnect from "@/lib/dbConnect";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const id = params.id;
    await dbConnect();

    const updatedProfile = await Profile.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedProfile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
