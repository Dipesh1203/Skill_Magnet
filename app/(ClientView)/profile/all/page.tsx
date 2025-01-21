"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import defaultProfileIcon from "@/public/assets/defaultProfileIcon.png";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/lib/utils";

interface UserProfile {
  _id: string;
  name: string;
  userName: string;
  email: string;
  image: string;
  headline: string;
  intro: string;
  skills: string[];
  projects: any[];
}

function ProfileCard1({ profile }: { profile: UserProfile }) {
  return (
    <>
      <CardContainer className="inter-var w-[20rem]">
        <CardBody className="bg-slate-100 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-[#1F2F46]/70 dark:border-[#19376D]/20 border-black/[0.1] w-auto sm:w-[22rem] h-auto rounded-xl p-6 border ">
          <div className="flex items-center justify-center">
            <CardItem translateZ="100" className="w-full mt-1">
              {profile.image ? (
                <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-2xl text-gray-600 overflow-hidden">
                  <Image
                    src={
                      profile.image.startsWith("http")
                        ? profile.image
                        : defaultProfileIcon
                    }
                    alt={profile.name}
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-2xl text-gray-600">
                  {profile.name.charAt(0)}
                </div>
              )}
            </CardItem>
          </div>
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white mt-4"
          >
            {profile.name}
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 line-clamp-2"
          >
            {profile.headline}
          </CardItem>
          <div className="flex justify-between items-center mt-3">
            <CardItem
              translateZ={20}
              as={Link}
              href={`/profile/${profile._id}`}
              className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
            >
              View
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </>
  );
}

export default function AllUserProfiles() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  // Fetch user profile
  const {
    data: profiles,
    isLoading: profileLoading,
    isError: profileError,
    error: profileFetchError,
  } = useQuery<UserProfile[], Error, UserProfile[]>({
    queryKey: ["UserProfiles"],
    queryFn: () => fetchData(`${apiUrl}/api/profile/all`),
  });

  if (profileLoading) {
    return <div className="text-center p-4">Loading profile...</div>;
  }

  if (profileError) {
    console.error("Error in AllUserProfiles component:", profileFetchError);
    return (
      <div className="text-center text-red-500 p-4">
        <h2 className="text-xl font-bold mb-2">Error Loading Profiles</h2>
        <p>
          {profileFetchError instanceof Error
            ? profileFetchError.message
            : "An unexpected error occurred"}
        </p>
        <p className="mt-2 text-sm">
          Please check the console for more details.
        </p>
      </div>
    );
  }

  if (!profiles || profiles.length === 0) {
    return (
      <div className="text-center text-yellow-500 p-4">
        No profiles available.
      </div>
    );
  }

  return (
    <div className="dark:bg-[#0b244700] bg-gradient-to-r from-bg-black to-customBack_primary_1  max-w-6xl mx-auto px-8 rounded-md">
      <h1 className="text-3xl font-bold  dark:text-slate-50 text-slate-6  700">
        Browse professionals
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {profiles.map((profile) => (
          <ProfileCard1 key={profile._id} profile={profile} />
        ))}
      </div>
    </div>
  );
}
