"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";

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

const DashBoard = () => {
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
    <div className="p-8 max-w-4xl mx-auto mt-10 bg-gradient-to-r from-bg-black to-customBack_primary_1 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-white text-4xl font-bold">Dashboard</h1>
        <button onClick={() => signOut()} className="text-white underline">
          Logout
        </button>
      </div>

      <div className="flex">
        <div className="w-2/3 pr-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-400">User Name</label>
              <input
                className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none"
                id="username"
                type="text"
                disabled
                placeholder={session.user.username || ""}
              />
            </div>

            <div>
              <label className="block text-gray-400">Name</label>
              <input
                className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none"
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={profile?.name || ""}
              />
            </div>

            <div>
              <label className="block text-gray-400">Email</label>
              <input
                className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none"
                id="email"
                type="text"
                disabled
                placeholder={profile?.email || ""}
              />
            </div>

            <div>
              <label className="block text-gray-400">Headline</label>
              <input
                className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none"
                id="headline"
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
                id="intro"
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
                  id="skillInput"
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleSkillAdd}
                  className="bg-[#576CBC] px-4 py-2 rounded text-white"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-[#576bbcd6] text-white px-3 py-1 rounded-full flex items-center space-x-2"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleSkillRemove(index)}
                      className="text-xs text-red-500"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-1/4 bg-[#576CBC] text-white py-3 rounded-lg mt-4"
              disabled={loading}
            >
              Edit
            </button>
          </form>
        </div>

        <div className="w-1/3 flex justify-center items-center">
          <img
            src={profile?.image || "/default-avatar.png"}
            alt="Profile"
            className="rounded-full w-32 h-32 object-cover shadow-lg mb-96"
          />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
