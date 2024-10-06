"use client";
import React from "react";
// import { calsans } from "@/fonts/calsans";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "../ui/tracing-beam";
import { IProject } from "@/app/models/projects.model";
import Link from "next/link";
interface ProjectCardProps {
  project: IProject[] | null;
}

const defaultProjectImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Pjlp3QsEwodfncokjV6dw7Ju9p4--J_PJg&usqp=CAU";

const ViewProfileProject: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <TracingBeam className="px-6 mt-12">
      <h1 className="text-4xl md:text-5xl font-extrabold text-customBack_primary mb-8 text-center">
        Projects
      </h1>
      <div className="max-w-2xl mx-auto antialiased pt-4 relative">
        {project &&
          project.map((project, index) => (
            <div key={`content-${index}`} className="mb-12">
              <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
                {project?.status}
              </h2>

              <p className="text-xl mb-4">{project?.title}</p>

              <div className="text-sm  prose prose-sm dark:prose-invert">
                {
                  <Image
                    src={
                      (project.image && `${project?.image[0]}`) ||
                      defaultProjectImage
                    }
                    alt="blog thumbnail"
                    height="1000"
                    width="1000"
                    className="rounded-lg mb-10 object-cover"
                  />
                }
                {project.description.length > 300
                  ? `${project.description.slice(0, 300)}...`
                  : project.description}
                <div className="text-sm  prose prose-sm dark:prose-invert mt-5 pt-5">
                  <Link
                    href={`project/${project._id}`}
                    className="p-3 bg-white text-black rounded-sm"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </TracingBeam>
  );
};

export default ViewProfileProject;
