import React, { useEffect, useState } from "react";
import styles from "./Projects.module.css";
// import projects from "../data/data.json";
import { ProjectCard } from "./ProjectCard";
import axios from "axios";

const Projects = (props) => {
  let projectId = props.projectId;
  console.log(typeof props.projectId);
  projectId;
  return (
    <section className={styles.container} id="projects">
      <h2 className={styles.title}>Projects</h2>
      <div className={styles.projects}>
        {projectId &&
          projectId.map((project, id) => {
            return <ProjectCard key={id} project={project} />;
          })}
      </div>
    </section>
  );
};

export default Projects;
