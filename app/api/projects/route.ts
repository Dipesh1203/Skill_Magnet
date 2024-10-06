import { NextRequest, NextResponse } from "next/server";
import { Profile, IProfile } from "@/app/models/profile.model";
import dbConnect from "@/lib/dbConnect";
import User, { IUser } from "@/app/models/user.model";
import { Project, IProject } from "@/app/models/projects.model";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const projects = await Project.find(); // Fetch all projects
    return NextResponse.json(projects);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while fetching projects." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    console.log(body);
    const { userId, ...data } = body;
    console.log(typeof data.image); // should log 'object'
    console.log(Array.isArray(data.image));
    // Connect to database
    await dbConnect();

    // Check if the user (owner) exists
    const user: IUser | null = await User.findOne({
      _id: userId,
    }).lean<IUser>();
    console.log(user);

    if (!user) {
      return NextResponse.json(
        { error: "User not found. Please register first." },
        { status: 404 }
      );
    }

    // Find the profile associated with the user
    const profile: IProfile | null = await Profile.findOne({
      owner: user._id,
    }).lean<IProfile>();
    console.log(profile);

    if (!profile) {
      return NextResponse.json(
        { error: "Please create your profile first" },
        { status: 404 }
      );
    }

    const projectData = {
      ...data,
      ownerProfile: profile._id,
    };
    console.log("Incoming project data:", projectData);
    console.log("Project image field type:", typeof projectData.image);
    console.log("Is image an array?", Array.isArray(projectData.image));

    const newProject = new Project({
      ...projectData,
    });
    await newProject.save();
    console.log("New Project Created:", newProject);

    const currentProjects = Array.isArray(profile.projects)
      ? profile.projects
      : [];

    const updatedProjects = [...currentProjects, newProject._id];

    const update = await Profile.updateOne(
      { _id: profile._id },
      { $set: { projects: updatedProjects } }
    );

    console.log("Update result:", update);

    // Respond with the created project
    return NextResponse.json(newProject);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
