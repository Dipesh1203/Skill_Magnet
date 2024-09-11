import { Profile } from "@/app/models/profile.model";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    let data = await Profile.find();
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
