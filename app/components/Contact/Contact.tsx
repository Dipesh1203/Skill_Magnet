import React from "react";
import styles from "./Contact.module.css";
import Image from "next/image";
// import { getImageUrl } from "../../utils"; // Assuming this is a utility function to get image URLs
import linkedinIcon from "./../../../public/assets/contact/linkedinIcon.png";
import emailIcon from "./../../../public/assets/contact/emailIcon.png";
import githubIcon from "./../../../public/assets/contact/githubIcon.png";

// Define the expected type for props
interface ContactProps {
  data: {
    email: string;
  };
}

const Contact: React.FC<ContactProps> = ({ data }) => {
  const { email } = data;

  return (
    <footer id="contact" className={styles.container}>
      <div className={styles.text}>
        <h2>Contact</h2>
        <p>Feel free to reach out!</p>
      </div>
      <ul className={styles.links}>
        <li className={styles.link}>
          <Image src={emailIcon} alt="Email icon" />
          <a href={`mailto:${email}`}>{email}</a>
        </li>
        <li className={styles.link}>
          <Image src={linkedinIcon} alt="LinkedIn icon" />
          {/* <a href={linkedin}>{linkedin}</a> */}
        </li>
        <li className={styles.link}>
          <Image src={githubIcon} alt="Github icon" />
          {/* <a href={github}>{github}</a> */}
        </li>
      </ul>
    </footer>
  );
};

export default Contact;
