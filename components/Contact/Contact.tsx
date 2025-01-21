"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import linkedinIcon from "../../public/assets/contact/linkedinIcon.png";
import emailIcon from "../../public/assets/contact/emailIcon.png";
import githubIcon from "../../public/assets/contact/githubIcon.png";
import { toast } from "@/hooks/use-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons"; // Import the specific icon

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
        <div className="py-10 my-10">
          <h1 className="text-4xl font-semibold text-black dark:text-white">
            Feel Free to reach out! <br />
            <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
              Contact
            </span>
          </h1>
          <li className="flex items-center">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="w-30 h-10 p-2 dark:text-white"
            />
            <a href={`mailto:${userDetails?.email}`} className="ml-2">
              {userDetails?.email}
            </a>
          </li>
          <button
            className="bg-blue-700 hover:bg-blue-600 text-white rounded-lg px-4 py-2"
            onClick={copyToClipBoard}
          >
            Copy Profile URL
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
