import { Profile } from "@/app/models/profile.model";
import { IProject, Project } from "@/app/models/projects.model";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await Project.findById(params.id);

    if (!user) {
      return NextResponse.json({ error: "Project Not Found" }, { status: 404 });
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
  await dbConnect();

  try {
    const projectId = params.id;
    const body = await request.json();

    // Find the project by ID and update it with the request body
    const updatedProject: IProject | null = await Project.findByIdAndUpdate(
      projectId,
      {
        $set: {
          title: body.title,
          description: body.description,
          technologies: body.technologies,
          image: body.image,
          duration: body.duration,
          status: body.status,
          liveLink: body.liveLink,
          repoLink: body.repoLink,
          contributors: body.contributors,
          challenges: body.challenges,
          achievements: body.achievements,
          category: body.category,
          tags: body.tags,
          feedback: body.feedback,
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedProject) {
      return NextResponse.json({ msg: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(
      { msg: "Project updated successfully", project: updatedProject },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update Project", details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  try {
    // Find the project by its ID
    const result: IProject | null = await Project.findById(params.id);
    if (!result) {
      return NextResponse.json(
        { msg: `Project Doesn't Exist` },
        { status: 404 }
      );
    }

    const owner = result.ownerProfile;

    // Remove the project from the owner's profile
    const profileUp = await Profile.findByIdAndUpdate(
      owner,
      {
        $pull: { projects: params.id }, // Directly remove the project ID from the array
      },
      { new: true } // Return the updated profile
    );

    // Delete the project itself
    const deletedProject = await Project.findByIdAndDelete(params.id);

    if (!deletedProject) {
      return NextResponse.json(
        { msg: `Failed to delete the project` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { msg: `Project ${deletedProject.title} is deleted successfully` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete Project" },
      { status: 500 }
    );
  }
}
