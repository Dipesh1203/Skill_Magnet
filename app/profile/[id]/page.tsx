import React from "react";
import Image from "next/image";
import Banner from "@/app/components/Banner/Banner";
import Skill from "@/app/components/Skill/Skill";
import Contact from "@/app/components/Contact/Contact";

interface UserProfile {
  _id: string;
  name: string;
  userName: string;
  email: string;
  image: string;
  headline: string;
  intro: string;
  skills: string[];
  projects: any[]; // You might want to define a more specific type for projects
}

async function getUserProfile(id: string): Promise<UserProfile> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const url = new URL(`/api/profile/${id}`, apiUrl);

  console.log(`Fetching profile from: ${url.toString()}`);

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error(`HTTP error! status: ${res.status}, body: ${errorBody}`);
      if (res.status === 404) {
        throw new Error("User not found");
      }
      throw new Error(`Failed to fetch user profile: ${res.statusText}`);
    }

    const data = await res.json();
    console.log("Fetched profile data:", data);
    return data;
  } catch (error) {
    console.error("Error in getUserProfile:", error);
    throw error;
  }
}

export default async function UserProfile({
  params,
}: {
  params: { id: string };
}) {
  let profile: UserProfile;

  try {
    console.log("Attempting to fetch user profile for id:", params.id);
    profile = await getUserProfile(params.id);
  } catch (error) {
    console.error("Error in UserProfile component:", error);
    if (error instanceof Error) {
      return (
        <div className="text-center text-red-500 p-4">
          <h2 className="text-xl font-bold mb-2">Error Loading Profile</h2>
          <p>{error.message}</p>
          <p className="mt-2 text-sm">
            Please check the console for more details.
          </p>
        </div>
      );
    }
    return (
      <div className="text-center text-red-500 p-4">
        An unexpected error occurred. Please check the console for more details.
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center text-yellow-500 p-4">
        No profile data available.
      </div>
    );
  }

  return (
    <>
      <Banner data={profile} />
      <Skill data={profile} />
      <Contact data={profile} />
    </>
  );
}
