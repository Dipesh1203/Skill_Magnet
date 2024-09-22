import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import defaultProfileIcon from "../../../../public/assets/defaultProfileIcon.png";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

interface UserProfile {
  _id: string;
  name: string;
  userName: string;
  email: string;
  image: string;
  headline: string;
  intro: string;
  skills: string[];
  projects: any[]; // You might want to define a more specific type for projects
}

async function getAllUserProfiles(): Promise<UserProfile[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const url = new URL("/api/profile/all", apiUrl);

  console.log(`Fetching all profiles from: ${url.toString()}`);

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error(`HTTP error! status: ${res.status}, body: ${errorBody}`);
      throw new Error(`Failed to fetch user profiles: ${res.statusText}`);
    }

    const data = await res.json();
    console.log("Fetched profiles data:", data);
    return data;
  } catch (error) {
    console.error("Error in getAllUserProfiles:", error);
    throw error;
  }
}

function ProfileCard1({ profile }: { profile: UserProfile }) {
  console.log(profile.image);

  return (
    <>
      {/* <Card className="bg-[#19366d9f] border-0 text-slate-50">
        <CardHeader>
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
          <CardTitle>{profile.name}</CardTitle>
          <CardDescription className="text-slate-100">
            @{profile.userName}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{profile.intro}</p>
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link href={`/profile/${profile._id}`}>View Profile</Link>
          </Button>
        </CardFooter>
      </Card> */}
      <CardContainer className="inter-var w-[20rem]">
        <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
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
            className="text-xl font-bold text-neutral-600 dark:text-white"
          >
            {profile.name}
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
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

export default async function AllUserProfiles() {
  let profiles: UserProfile[];

  try {
    console.log("Attempting to fetch all user profiles");
    profiles = await getAllUserProfiles();
  } catch (error) {
    console.error("Error in AllUserProfiles component:", error);
    return (
      <div className="text-center text-red-500 p-4">
        <h2 className="text-xl font-bold mb-2">Error Loading Profiles</h2>
        <p>
          {error instanceof Error
            ? error.message
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
    <div className="bg-[#0b24478c] max-w-6xl mx-auto p-8 rounded-md">
      <h1 className="text-3xl font-bold mb-3 text-slate-50">
        All User Profiles
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <ProfileCard1 key={profile._id} profile={profile} />
        ))}
      </div>
    </div>
  );
}
