import React from "react";
import Image from "next/image";
import Link from "next/link";

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

async function getAllUserProfiles(): Promise<UserProfile[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const url = new URL("/api/profile/all", apiUrl);

  console.log(`Fetching all profiles from: ${url.toString()}`);

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
      throw new Error(`Failed to fetch user profiles: ${res.statusText}`);
    }

    const data = await res.json();
    console.log("Fetched profiles data:", data);
    return data;
  } catch (error) {
    console.error("Error in getAllUserProfiles:", error);
    throw error;
  }
}

function ProfileCard({ profile }: { profile: UserProfile }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4">
        <div className="flex items-center mb-4">
          {profile.image ? (
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-xl text-gray-600 overflow-hidden">
              <Image
                src="/api/placeholder/48/48"
                alt={profile.name}
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-xl text-gray-600">
              {profile.name.charAt(0)}
            </div>
          )}
          <div className="ml-4">
            <h2 className="text-xl font-bold">{profile.name}</h2>
            <p className="text-gray-600">@{profile.userName}</p>
            <p className="text-gray-600">Email : {profile.email}</p>
          </div>
        </div>
        <p className="text-gray-700 mb-2">{profile.headline}</p>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Skills</h3>
          <div className="flex flex-wrap">
            {profile.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 mb-2 text-sm"
              >
                {skill}
              </span>
            ))}
            {profile.skills.length > 3 && (
              <span className="text-gray-500 text-sm">
                +{profile.skills.length - 3} more
              </span>
            )}
          </div>
        </div>
        <Link
          href={`/profile/${profile._id}`}
          className="text-blue-500 hover:underline"
        >
          View Full Profile
        </Link>
      </div>
    </div>
  );
}

export default async function AllUserProfiles() {
  let profiles: UserProfile[];

  try {
    console.log("Attempting to fetch all user profiles");
    profiles = await getAllUserProfiles();
  } catch (error) {
    console.error("Error in AllUserProfiles component:", error);
    return (
      <div className="text-center text-red-500 p-4">
        <h2 className="text-xl font-bold mb-2">Error Loading Profiles</h2>
        <p>
          {error instanceof Error
            ? error.message
            : "An unexpected error occurred"}
        </p>
        <p className="mt-2 text-sm">
          Please check the console for more details.
        </p>
      </div>
    );
  }

  if (!profiles || profiles.length === 0) {
    return (
      <div className="text-center text-yellow-500 p-4">
        No profiles available.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">All User Profiles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <ProfileCard key={profile._id} profile={profile} />
        ))}
      </div>
    </div>
  );
}
