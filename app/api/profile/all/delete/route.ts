import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { Profile } from "@/app/models/profile.model";

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
