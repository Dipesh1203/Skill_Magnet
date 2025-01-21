"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Banner from "@/components/Banner/Banner";
import Skill from "@/components/Skill/Skill";
import Contact from "@/components/Contact/Contact";
import ViewProfileProject from "@/components/Project/ViewProfileProject";
import { fetchData } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { IProject } from "@/app/models/projects.model";

interface UserProfile {
  _id: string;
  name: string;
  userName: string;
  email: string;
  image: string;
  headline: string;
  intro: string;
  skills: string[];
  projects: IProject[]; // Specify project type
}

export default function UserProfile({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { status } = useSession();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  // Fetch user profile
  const {
    data: profile,
    isLoading: profileLoading,
    isError: profileError,
    error: profileFetchError,
  } = useQuery<UserProfile, Error, UserProfile>({
    queryKey: ["UserProfile", params.id],
    queryFn: () => fetchData(`${apiUrl}/api/profile/${params.id}`),
    enabled: status !== "loading",
  });

  // Fetch user projects
  const {
    data: projects,
    isLoading: projectsLoading,
    isError: projectsError,
    error: projectsFetchError,
  } = useQuery<IProject[], Error>({
    queryKey: ["userProjects", params.id],
    queryFn: () => fetchData(`${apiUrl}/api/projects/profile/${params.id}`),
    enabled: !!profile,
  });

  if (profileLoading || projectsLoading) {
    return <div className="text-center p-4">Loading profile...</div>;
  }

  if (profileError) {
    return (
      <div className="text-center text-red-500 p-4">
        <h2 className="text-xl font-bold mb-2">Error Loading Profile</h2>
        <p>{profileFetchError?.message}</p>
      </div>
    );
  }

  if (projectsError) {
    return (
      <div className="text-center text-red-500 p-4">
        <h2 className="text-xl font-bold mb-2">Error Loading Projects</h2>
        <p>{projectsFetchError?.message}</p>
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
      {profile?.skills && <Skill data={{ skills: profile.skills }} />}
      {projects && projects.length > 0 && (
        <ViewProfileProject project={projects || null} />
      )}
      <Contact data={profile} />
    </>
  );
}
