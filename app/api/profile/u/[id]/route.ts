import { NextRequest, NextResponse } from "next/server";
import { Profile } from "@/app/models/profile.model";
import dbConnect from "@/lib/dbConnect";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    await dbConnect();

    const userProfile = await Profile.findOne({ owner: id });

    if (!userProfile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json(userProfile);
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
