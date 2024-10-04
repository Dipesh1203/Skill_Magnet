"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import profileImage from "./../../public/assets/hero/heroImage.png";
import Banner from "../../components/Banner/Banner";
import Skill from "../../components/Skill/Skill";
import Contact from "../../components/Contact/Contact";
import { LampContainer } from "@/components/ui/lamp";
import * as motion from "framer-motion/client";
import ProjectCard from "@/app/components/Project/Project";
import { IProject } from "@/app/models/projects.model";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

interface UserProfile {
  _id: string;
  name: string;
  userName: string;
  email: string;
  image: string;
  headline: string;
  intro: string;
  skills: string[];
  projects: IProject[]; // Consider defining a more specific type for projects
}

export default function CurrentUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [projects, setProjects] = useState<IProject[] | null>(null);
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
        const projectUrl = new URL(`/api/projects/profile/${data._id}`, apiUrl);
        const res1 = await fetch(projectUrl.toString(), {
          credentials: "include", // This is important for including cookies in the request
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res1.ok) {
          const errorBody = await res1.text();
          console.error(
            `HTTP error! status: ${res1.status}, body: ${errorBody}`
          );
          throw new Error(`Failed to fetch project: ${res1.statusText}`);
        }
        const fetchProject = await res1.json();
        setProjects(fetchProject);
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
    <>
      <Banner data={profile} />
      <Skill data={profile} />

      {projects && projects.length > 0 && (
        <div className="w-4/5 flex flex-col mx-auto my-20 p-10 rounded-lg dark:bg-[#19376D]/30 backdrop-blur-md shadow-lg">
          <h1 className="text-white text-4xl font-bold">Projects</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects?.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                defaultProjectImage={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Pjlp3QsEwodfncokjV6dw7Ju9p4--J_PJg&usqp=CAU`}
              />
            ))}
          </div>
        </div>
      )}

      <Contact data={profile} />
    </>
  );
}
