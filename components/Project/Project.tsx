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

// Example usage in the ProjectCard component
import Image from "next/image";
import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { IProject } from "@/app/models/projects.model";

interface ProjectCardProps {
  project: IProject;
  defaultProjectImage: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  defaultProjectImage,
}) => {
  return (
    <CardContainer className="inter-var ">
      <CardBody className="bg-white/70 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-[#1F2F46]/70 dark:border-[#19376D]/20 border-black/[0.1] w-auto sm:w-[22rem] h-auto rounded-xl p-6 border ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {project?.title}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src={
              project?.image[0] ||
              "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {project.description.length > 100
            ? `${project.description.slice(0, 100)}...`
            : project.description}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies &&
              project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
          </div>
        </CardItem>

        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          <span className="text-gray-400 mt-4">{project.status}</span>
        </CardItem>
        <div className="flex justify-between items-center mt-5">
          {project.liveLink && (
            <CardItem
              translateZ={20}
              as={Link}
              href={project.liveLink}
              target="__blank"
              className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
            >
              Live Demo
            </CardItem>
          )}
          {project.repoLink && (
            <CardItem
              translateZ={20}
              as={Link}
              href={project.repoLink}
              target="__blank"
              className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
            >
              Source Code
            </CardItem>
          )}
          <CardItem
            translateZ={20}
            as={Link}
            href={`/project/${project._id}`}
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            View
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
};

export default ProjectCard;
