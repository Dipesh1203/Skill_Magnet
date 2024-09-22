"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import imagep from "../../../public/assets/hero/heroImage.png";
import { toast } from "@/hooks/use-toast";
import { PinContainer, PinPerspective } from "@/components/ui/3d-pin";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const Banner = (props: any) => {
  let userDetails = props.data;
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
  const words = [
    {
      text: "Hii",
    },
    {
      text: "I'm",
    },
    {
      text: userDetails.name,
      className: "text-blue-500 dark:text-blue-500",
    },
  ];

  return (
    <section className="relative flex flex-col lg:flex-row items-center justify-between mt-12 mx-[10%]">
      <div className="flex flex-col items-start text-left z-10">
        <TypewriterEffectSmooth words={words} />
        <h3 className="text-3xl lg:text-4xl mb-12">{userDetails.headline}</h3>
        <TextGenerateEffect words={userDetails.intro} />
        <div className="flex items-center px-4 rounded-lg"></div>
      </div>

      <Image
        src={userDetails.image.startsWith("https") ? userDetails.image : imagep}
        alt="Profile Image"
        width={400}
        height={500}
        className="rounded-full lg:w-1/2 z-10 animate-floating"
      />
    </section>
  );
};

export default Banner;
