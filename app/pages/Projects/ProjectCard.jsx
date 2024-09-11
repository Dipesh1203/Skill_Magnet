import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import styles from "./ProjectCard.module.css";
import { getImageUrl } from "../../utils";

export const ProjectCard = (props) => {
  let projectId = props.project;
  let [projectData, setProjectData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/profile/projects/${projectId}`)
      .then((res) => setProjectData(res.data));
  }, []);
  return (
    <div className={styles.container}>
      <img
        src={getImageUrl(projectData.image)}
        alt={`Image of ${projectData.title}`}
        className={styles.image}
      />
      <h3 className={styles.title}>{projectData.title}</h3>
      <p className={styles.description}>{projectData.description}</p>
      {/* <ul className={styles.skills}>
        {skills.map((skill, id) => {
          return (
            <li key={id} className={styles.skill}>
              {skill}
            </li>
          );
        })}
      </ul> */}
      <div className={styles.links}>
        <a href={projectData.link} className={styles.link}>
          link
        </a>
        {/* <a href={source} className={styles.link}>
          Source
        </a> */}
      </div>
    </div>
  );
};
