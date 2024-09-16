"use client";
import React, { useEffect, useState } from "react";
// import { getImageUrl } from "../../utils";
import styles from "./Banner.module.css";
import imagep from "../../../public/assets/hero/heroImage.png";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";

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
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Hi, I'm {userDetails.name}</h1>
        <h3 className={styles.headline}>{userDetails.headline}</h3>
        <p className={styles.intro}>{userDetails.intro}</p>
        <div className="flex items-center px-5 bg-[#19376D] rounded-lg">
          <input
            type="text"
            value={profileUrl}
            className="input input-bordered rounded-lg p-2 mr-2"
            disabled
          />
          <button
            className={`${styles.contactBtn} rounded-lg p-5 m-5`}
            onClick={copyToClipBoard}
          >
            Copy Profile URL
          </button>
        </div>
      </div>
      <Image
        src={userDetails.image.startsWith("https") ? userDetails.image : imagep}
        alt="Profile-Image"
        width={400}
        height={500}
        className={`${styles.profileImg} ml-40 rounded-full`}
      />
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};

export default Banner;
