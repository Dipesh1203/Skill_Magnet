import { Profile } from "@/app/models/profile.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await Profile.findById(params.id);

    if (!user) {
      return NextResponse.json({ error: "User Not Found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
