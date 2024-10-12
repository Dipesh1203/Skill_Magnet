"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import linkedinIcon from "../../public/assets/contact/linkedinIcon.png";
import emailIcon from "../../public/assets/contact/emailIcon.png";
import githubIcon from "../../public/assets/contact/githubIcon.png";
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
    <footer id="contact" className="py-10">
      <div className="flex flex-col overflow-hidden mx-auto w-[70%]">
        <ContainerScroll
          titleComponent={
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Feel Free to reach out! <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Contact
              </span>
            </h1>
          }
        >
          <PinContainer title={profileUrl} href={profileUrl}>
            <div className="bg-[url('/assets/pinmap.jpg')] bg-cover bg-center flex flex-col p-4 text-slate-100/50 w-[30rem] h-[15rem] sm:basis-1/2">
              <button
                className="bg-blue-700 hover:bg-blue-600 text-white rounded-lg px-4 py-2"
                onClick={copyToClipBoard}
              >
                Copy Profile URL
              </button>
            </div>
          </PinContainer>
          <ul className="mt-4 space-y-1">
            <li className="flex items-center">
              <Image src={emailIcon} alt="Email icon" />
              <a href={`mailto:${userDetails?.email}`} className="ml-2">
                {userDetails?.email}
              </a>
            </li>
            {/* <li className="flex items-center">
              <Image src={linkedinIcon} alt="LinkedIn icon" />
              <a href={linkedin}>{linkedin}</a>
            </li>
            <li className="flex items-center">
              <Image src={githubIcon} alt="Github icon" />
              <a href={github}>{github}</a>
            </li> */}
          </ul>
        </ContainerScroll>
      </div>
    </footer>
  );
};

export default Contact;
