"use client";
import React, { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

interface UserProfile {
  _id: string;
  name: string;
  userName: string;
  email: string;
  image: string;
  headline: string;
  intro: string;
  skills: string[];
  projects: any[]; // Consider defining a more specific type for projects
}
function SidebarDemo() {
  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-7xl  border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-[100vh]" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <Image
                    src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}
const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Acet Labs
      </motion.span>
    </Link>
  );
};
const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

// Dummy dashboard component with content
const Dashboard = () => {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [name, setName] = useState("");
  const [headline, setHeadline] = useState("");
  const [intro, setIntro] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [skills, setSkills] = useState<string[]>([]);

  useEffect(() => {
    async function fetchProfile() {
      if (status === "loading") return;
      if (!session?.user) {
        router.push("/api/auth/signin");
        return;
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const url = new URL(`/api/profile/all`, apiUrl);

      try {
        const res = await fetch(url.toString(), {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          const errorBody = await res.text();
          console.error(
            `HTTP error! status: ${res.status}, body: ${errorBody}`
          );
          throw new Error(`Failed to fetch user profile: ${res.statusText}`);
        }

        const data1 = await res.json();
        const data = data1.find((data: any) => data.owner === session.user._id);

        if (!data) {
          throw new Error("Profile not found");
        }

        setProfile(data);
        setSkills(data.skills || []);
        setName(data.name || "");
        setIntro(data.intro || "");
        setHeadline(data.headline || "");
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );

        if (err instanceof Error && err.message.includes("Profile not found")) {
          router.push("/profile/new");
          return;
        }

        if (err instanceof Error && err.message.includes("401")) {
          router.push("/api/auth/signin");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [router, session, status]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return (
      <div className="flex flex-col p-5">
        <p>You need to sign in to create a profile.</p>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  }

  const handleSkillAdd = () => {
    if (skillInput.trim() !== "") {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleSkillRemove = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`api/profile/update/${profile?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          headline,
          intro,
          skills,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error);
        return;
      }

      const newProfile = await response.json();
      router.push(`/profile/${newProfile._id}`);
    } catch (error) {
      setError("An error occurred while editing the profile.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-3/4">
      <Tabs defaultValue="dashboard">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-400">Name</label>
              <input
                className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={profile?.name || ""}
              />
            </div>

            <div>
              <label className="block text-gray-400">Headline</label>
              <input
                className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none"
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder={profile?.headline || ""}
              />
            </div>

            <div>
              <label className="block text-gray-400">Intro</label>
              <textarea
                className="w-full p-3 h-24 rounded bg-gray-800 text-white focus:outline-none"
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
                placeholder={profile?.intro || ""}
              />
            </div>

            <div>
              <label className="block text-gray-400">Skills</label>
              <div className="flex space-x-2 mb-3">
                <input
                  className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleSkillAdd}
                  className="bg-blue-600 px-4 py-2 rounded text-white"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-blue-600 text-white px-3 py-1 rounded-full flex items-center"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleSkillRemove(index)}
                      className="text-xs ml-2 text-red-500"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg"
              disabled={loading}
            >
              Save Changes
            </button>
          </form>
        </TabsContent>

        <TabsContent value="projects"></TabsContent>
      </Tabs>
    </div>
  );
};
export default SidebarDemo;
