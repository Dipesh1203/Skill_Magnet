"use client";
import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import ProjectCard from "@/app/components/Project/Project";
import { IProject } from "@/app/models/projects.model";

interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  image: {
    url: string;
  };
  liveLink: string;
  repoLink: string;
  status: string;
}

const ProjectsPage = () => {
  const { data: session, status } = useSession();
  const [projects, setProjects] = useState<IProject[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchProjects() {
      if (status === "loading") return;
      if (!session?.user) {
        router.push("/api/auth/signin");
        return;
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const url = new URL(`/api/projects/`, apiUrl);

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
          throw new Error(`Failed to fetch projects: ${res.statusText}`);
        }

        const data = await res.json();
        setProjects(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
      }
    }

    fetchProjects();
  }, [router, session, status]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return (
      <div className="flex flex-col p-5">
        <p>You need to sign in to view projects.</p>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto mt-10 bg-gradient-to-r from-bg-black to-customBack_primary_1 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-white text-4xl font-bold">Projects</h1>
      </div>

      {error ? (
        <div className="text-red-500">Error: {error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <>
              <ProjectCard
                key={project._id}
                project={project}
                defaultProjectImage={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Pjlp3QsEwodfncokjV6dw7Ju9p4--J_PJg&usqp=CAU`}
              />
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
