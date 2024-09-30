"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession, signOut, signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

const CreateProfile = () => {
  const { data: session, status } = useSession();
  const [name, setName] = useState("");
  const [headline, setHeadline] = useState("");
  const [intro, setIntro] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md max-w-md mx-auto text-center transition duration-300">
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Please sign in to create your profile.
        </p>
        <button
          onClick={() => signIn()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Sign In
        </button>
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
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          userName: session.user.username,
          email: session.user.email,
          image: session.user.image,
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
      setError("An error occurred while creating the profile.");
    } finally {
      setLoading(false);
    }
  };
  console.log(session);

  return (
    <div className="p-8 max-w-4xl mx-auto mt-10 bg-gradient-to-r from-gray-900 to-black rounded-lg shadow-lg">
      <h1 className="text-white text-4xl font-bold mb-6">Create a Profile</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading && <p className="text-white mb-4">Loading...</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-400">Name</label>
          <input
            className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
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
            required
          />
        </div>
        <div>
          <label className="block text-gray-400">Intro</label>
          <textarea
            className="w-full p-3 h-24 rounded bg-gray-800 text-white focus:outline-none"
            id="intro"
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
            required
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
          className="w-full bg-[#576CBC] text-white py-3 rounded-lg mt-4"
          disabled={loading}
        >
          Create Profile
        </button>
      </form>
    </div>
  );
};

export default CreateProfile;
