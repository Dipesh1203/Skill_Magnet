import { Profile } from "@/app/models/profile.model";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    let data = await Profile.find();
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
export async function DELETE(request: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();

    // Delete all profiles
    const result = await Profile.deleteMany({});

    // Respond with the result of the deletion
    return NextResponse.json({
      message: "All profiles deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while deleting profiles." },
      { status: 500 }
    );
  }
}
