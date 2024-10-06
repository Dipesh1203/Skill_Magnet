"use client"; // Ensure this line is at the top

import React, { useEffect, useState } from "react";
import Banner from "@/components/Banner/Banner";
import Skill from "@/components/Skill/Skill";
import Contact from "@/components/Contact/Contact";
import { IProject } from "@/app/models/projects.model";
import ProjectCard from "@/components/Project/Project";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ViewProfileProject from "@/components/Project/ViewProfileProject";

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
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [projects, setProjects] = useState<IProject[] | null>(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    async function fetchProfile() {
      if (status === "loading") return; // Wait for session to load

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const url = new URL(`/api/profile/${params.id}`, apiUrl);

      try {
        const res = await fetch(url.toString(), {
          credentials: "include",
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

        const data = await res.json();

        if (!data || data.length === 0) {
          throw new Error("Profile not found");
        }

        // Fetch projects
        const projectUrl = new URL(`/api/projects/profile/${data._id}`, apiUrl);
        const res1 = await fetch(projectUrl.toString(), {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res1.ok) {
          const errorBody = await res1.text();
          console.error(
            `HTTP error! status: ${res1.status}, body: ${errorBody}`
          );
          throw new Error(`Failed to fetch projects: ${res1.statusText}`);
        }

        const fetchProject = await res1.json();
        setProjects(fetchProject);
        setProfile(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );

        if (err instanceof Error && err.message.includes("Profile not found")) {
          router.push("/profile/new");
          return;
        }

        if (err instanceof Error && err.message.includes("401")) {
          router.push("/api/auth/signin");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [router, session, status, params.id]);

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
    <>
      <Banner data={profile} />
      <Skill data={profile} />

      {/* {projects && projects.length > 0 && (
        <div className="w-4/5 flex flex-col mx-auto my-20 p-10 rounded-lg dark:bg-[#19376D]">
          <h1 className="text-white text-4xl font-bold">Projects</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                defaultProjectImage={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Pjlp3QsEwodfncokjV6dw7Ju9p4--J_PJg&usqp=CAU`}
              />
            ))}
          </div>
        </div>
      )} */}
      <ViewProfileProject project={projects} />
      <Contact data={profile} />
    </>
  );
}
