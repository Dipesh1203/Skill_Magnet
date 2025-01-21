"use client";
import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import defaultProjectImage from "./../../../../public/assets/projects/project.png";
import { IProject } from "@/app/models/projects.model";
import Link from "next/link";
import Image from "next/image";
import ImageCarousel from "@/components/ImageCarousel";
import { IProfile } from "@/app/models/profile.model";

const ViewProject = ({ params }: { params: { id: string } }) => {
  // const { data: session, status } = useSession();
  const [project, setProject] = useState<IProject | null>(null);
  const [userProfile, setUserProfile] = useState<IProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch the project data based on the ID
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    async function fetchProject() {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const url = new URL(`/api/projects/${params.id}`, apiUrl);

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
          throw new Error(`Failed to fetch project: ${res.statusText}`);
        }

        const data = await res.json();
        setProject(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
      }
    }
    fetchProject();
    async function fetchProfile() {
      // if (status === "loading") return;
      if (!project?.ownerProfile) {
        return;
      }
      const url = new URL(`/api/profile/${project?.ownerProfile}`, apiUrl);

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
          throw new Error(`Failed to fetch profile: ${res.statusText}`);
        }
        const data = await res.json();

        setUserProfile(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
      }
    }
    fetchProfile();
  }, [router, params.id]);

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <div className="p-8 max-w-6xl mx-auto mt-10 bg-gradient-to-r from-bg-black to-customBack_primary_1 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="dark:text-white text-black text-4xl font-bold">
          Project Details
        </h1>
      </div>

      <div className="dark:bg-gray-800 bg-slate-200 p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <ImageCarousel images={project?.image || []} />
        </div>
        <h2 className="text-white text-3xl font-bold mb-2">{project?.title}</h2>
        <p className="text-gray-300 text-lg mb-4">{project?.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project?.technologies.map((tech, index) => (
            <span
              key={index}
              className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex justify-between mt-6">
          {project?.liveLink && (
            <Link
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#576CBC] underline hover:text-blue-400"
            >
              Live Demo
            </Link>
          )}
          {project?.repoLink && (
            <Link
              href={project.repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#576CBC] underline hover:text-blue-400"
            >
              Source Code
            </Link>
          )}
        </div>
        <span className="block dark:text-gray-400 text-gray-700 mt-4 text-lg">
          Status: {project?.status}
        </span>
      </div>
    </div>
  );
};

export default ViewProject;
