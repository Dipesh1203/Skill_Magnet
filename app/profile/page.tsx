"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface UserProfile {
  _id: string;
  name: string;
  userName: string;
  email: string;
  image: string;
  headline: string;
  intro: string;
  skills: string[];
  projects: any[]; // Consider defining a more specific type for projects
}

export default function CurrentUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    async function fetchProfile() {
      // Redirect to login if the session is not authenticated
      if (status === "loading") return; // Wait for session to load
      if (!session?.user) {
        router.push("/api/auth/signin");
        return;
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const url = new URL(`/api/profile/all`, apiUrl);

      try {
        const res = await fetch(url.toString(), {
          credentials: "include", // This is important for including cookies in the request
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          const errorBody = await res.text();
          console.error(
            `HTTP error! status: ${res.status}, body: ${errorBody}`
          );
          throw new Error(`Failed to fetch user profile: ${res.statusText}`);
        }

        const data1 = await res.json();
        console.log("Fetched profile data:", data1);

        const data = data1.find((data: any) => data.owner === session.user._id);
        console.log("Session owner", session.user._id);

        if (!data) {
          throw new Error("Profile not found");
        }

        setProfile(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );

        if (err instanceof Error && err.message.includes("Profile not found")) {
          // Redirect to the profile creation page if no profile is found
          router.push("/profile/new");
          return;
        }

        if (err instanceof Error && err.message.includes("401")) {
          // Redirect to login on authentication error
          router.push("/api/auth/signin");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [router, session, status]);

  if (loading) {
    return <div className="text-center p-4">Loading profile...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <h2 className="text-xl font-bold mb-2">Error Loading Profile</h2>
        <p>{error}</p>
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
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4">
          <div className="flex items-center mb-4">
            {profile.image ? (
              <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-2xl text-gray-600 overflow-hidden">
                <Image
                  src={
                    profile.image.startsWith("http")
                      ? profile.image
                      : "/default-image.png"
                  }
                  alt={profile.name}
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-2xl text-gray-600">
                {profile.name.charAt(0)}
              </div>
            )}
            <div className="ml-4">
              <h2 className="text-2xl font-bold">{profile.name}</h2>
              <p className="text-gray-600">@{profile.userName}</p>
              <p className="text-gray-600">{profile.email}</p>
            </div>
          </div>
          <p className="text-lg font-semibold mb-2">{profile.headline}</p>
          <p className="text-gray-700 mb-4">{profile.intro}</p>
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Skills</h3>
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
              <h3 className="text-xl font-semibold mb-2">Projects</h3>
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
