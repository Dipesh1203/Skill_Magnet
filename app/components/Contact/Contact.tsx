"use client";
import React, { useEffect, useState } from "react";
import styles from "./Contact.module.css";
import Image from "next/image";
// import { getImageUrl } from "../../utils"; // Assuming this is a utility function to get image URLs
import linkedinIcon from "./../../../public/assets/contact/linkedinIcon.png";
import emailIcon from "./../../../public/assets/contact/emailIcon.png";
import githubIcon from "./../../../public/assets/contact/githubIcon.png";
import { PinContainer } from "@/components/ui/3d-pin";
import { toast } from "@/hooks/use-toast";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

// Define the expected type for props
interface ContactProps {
  data: {
    email: string;
    _id: string;
  };
}

const Contact: React.FC<ContactProps> = ({ data }) => {
  const userDetails = data;
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    setBaseUrl(`${window.location.protocol}//${window.location.host}`);
  }, []);

  const profileUrl = `${baseUrl}/profile/${userDetails._id}`;

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast({
      title: "URL Copied",
      description: "URL Copied to clipboard",
    });
  };

  return (
    <footer id="contact" className={`${styles.container}`}>
      <div className="flex flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-semibold text-black dark:text-white">
                Feel Free to reach out! <br />
                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                  Contact
                </span>
              </h1>
            </>
          }
        >
          {/* <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-auto p-5"> */}
          <PinContainer title={profileUrl} href={profileUrl}>
            <div className="bg-[url('/assets/pinmap.jpg')] bg-cover bg-center flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[15rem] ">
              <button
                className="bg-blue-700 hover:bg-blue-600 text-white rounded-lg px-4 py-2"
                onClick={copyToClipBoard}
              >
                Copy Profile URL
              </button>
            </div>
          </PinContainer>
          <ul className={styles.links}>
            <li className={styles.link}>
              <Image src={emailIcon} alt="Email icon" />
              <a href={`mailto:${userDetails?.email}`}>{userDetails?.email}</a>
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
          {/* </div> */}
        </ContainerScroll>
      </div>
      {/* <div className={styles.text}>
        <h2>Contact</h2>
        <p>Feel free to reach out!</p>
      </div> */}
    </footer>
  );
};

export default Contact;
