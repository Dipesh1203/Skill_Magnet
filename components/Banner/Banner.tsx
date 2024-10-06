"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
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
    <section className="relative flex flex-col lg:flex-row items-center justify-between mt-12 mb-48 mx-[10%]">
      <div className="flex flex-col items-start text-left z-10 lg:w-1/2 min-h-[400px]">
        <TypewriterEffectSmooth words={words} />
        <h3 className="text-3xl lg:text-4xl mb-4">{userDetails.headline}</h3>
        <TextGenerateEffect words={userDetails.intro} />
        <div className="flex items-center px-4 rounded-lg"></div>
      </div>

      <Image
        src={userDetails.image || "/assets/hero/heroImage.png"}
        alt="Profile Image"
        width={300}
        height={300}
        className="rounded-full lg:w-1/2 z-10 animate-floating object-cover h-auto lg:h-[400px] lg:w-[400px]"
      />
    </section>
  );
};

export default Banner;
