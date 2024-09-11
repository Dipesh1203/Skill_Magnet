// app/profile/new/page.tsx
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

const CreateProfile = () => {
  const { data: session, status } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
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
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          userName: session.user.username,
          email,
          image,
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

  return (
    <div className="p-5 m-5 flex flex-col">
      <h1 className="h1 size-20">Create a Profile</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading...</p>}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col p-5">
          <label htmlFor="name">Name</label>
          <input
            className="text-slate-900"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col p-5">
          <label htmlFor="email">Email</label>
          <input
            className="text-slate-900"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col p-5">
          <label htmlFor="image">Image URL</label>
          <input
            className="text-slate-900"
            id="image"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="flex flex-col p-5">
          <label htmlFor="headline">Headline</label>
          <input
            className="text-slate-900"
            id="headline"
            type="text"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col p-5">
          <label htmlFor="intro">Intro</label>
          <textarea
            className="text-slate-900"
            id="intro"
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col p-5">
          <label htmlFor="skills">Skills</label>
          <div className="flex flex-col p-5">
            <input
              className="text-slate-900"
              id="skillInput"
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
            />
            <button type="button" onClick={handleSkillAdd}>
              Add Skill
            </button>
          </div>
          <ul>
            {skills.map((skill, index) => (
              <li key={index}>
                {skill}
                <button type="button" onClick={() => handleSkillRemove(index)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button
          type="submit"
          className="bg-white rounded-sm text-slate-900 p-4"
          disabled={loading}
        >
          Create Profile
        </button>
      </form>
    </div>
  );
};

export default CreateProfile;
