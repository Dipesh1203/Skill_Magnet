import React from "react";
import Image from "next/image";

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
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4">
          <div className="flex items-center mb-4">
            {/* {profile.image ? (
              <Image
                src={profile.image}
                alt={profile.name}
                width={100}
                height={100}
                className="rounded-full"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-2xl text-gray-600">
                {profile.name.charAt(0)}
              </div>
            )} */}
            <div className="ml-4">
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              <p className="text-gray-600">@{profile.userName}</p>
            </div>
          </div>
          <p className="text-lg font-semibold mb-2">{profile.headline}</p>
          <p className="text-gray-700 mb-4">{profile.intro}</p>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Skills</h2>
            <div className="flex flex-wrap">
              {profile.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 mb-2"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          {profile.projects.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Projects</h2>
              <ul className="list-disc list-inside">
                {profile.projects.map((project, index) => (
                  <li key={index}>{project.name}</li> // Adjust based on your project structure
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
