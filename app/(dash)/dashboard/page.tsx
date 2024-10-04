"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

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
interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  status: string;
  liveLink?: string;
  repoLink?: string;
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
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState<Project | null>(null); // For project form
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null); // To track the project being edited

  useEffect(() => {
    async function fetchProfile() {
      if (status === "loading") return;
      if (!session?.user) {
        router.push("/api/auth/signin");
        return;
      }
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const url = new URL(`/api/profile/u/${session.user._id}`, apiUrl);

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

        const data = await res.json();
        // const data = data1.find((data: any) => data.owner === session.user._id);

        if (!data) {
          throw new Error("Profile not found");
        }
        const urlProject = new URL(
          `/api/projects/profile/${data?._id}`,
          apiUrl
        );
        const res2 = await fetch(urlProject.toString(), {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res2.ok) {
          const errorBody = await res.text();
          console.error(
            `HTTP error! status: ${res.status}, body: ${errorBody}`
          );
          throw new Error(`Failed to fetch Project: ${res.statusText}`);
        }

        const projectData = await res2.json();
        setProjects(projectData);
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
      const response = await fetch(`api/profile/${profile?._id}`, {
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
  const handleEditProject = (projectId: string) => {
    const projectToEdit = projects.find((project) => project._id === projectId);
    if (projectToEdit) {
      setNewProject(projectToEdit);
      setEditingProjectId(projectId); // Set the ID of the project being edited
    }
  };

  const handleProjectFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (newProject) {
      setNewProject({ ...newProject, [e.target.name]: e.target.value });
    }
  };

  const handleUpdateProject = async () => {
    if (!editingProjectId || !newProject) return;

    try {
      const response = await fetch(`/api/projects/${editingProjectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      });

      if (response.ok) {
        const updatedProject = await response.json();
        setProjects((prev) =>
          prev.map((proj) =>
            proj._id === updatedProject._id ? updatedProject : proj
          )
        );
        setEditingProjectId(null); // Close the edit form
        setNewProject(null);
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingProjectId(null);
    setNewProject(null); // Reset form
  };

  return (
    <div className="m-0 p-0 bg-gray-900 h-[100vh] w-full">
      <div className="max-w-6xl mx-auto  p-8 rounded-lg shadow-lg h-full">
        <div className="flex">
          <div className="w-1/4 bg-gray-800 p-6 rounded-lg mr-6">
            <div className="text-center">
              <img
                src={profile?.image || "/default-avatar.png"}
                alt="Profile"
                className="w-32 h-32 mx-auto rounded-full object-cover mb-4 shadow-lg"
              />
              <h2 className="text-white text-2xl font-semibold">
                {profile?.name}
              </h2>
              <p className="text-gray-400">{profile?.headline}</p>
              <div className="mt-4">
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-lg"
                  onClick={() => signOut()}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Main Dashboard */}
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

              <TabsContent value="projects">
                <div className="w-full">
                  {!editingProjectId ? (
                    <div>
                      <h2 className="text-white text-2xl mb-4">Projects</h2>
                      <ul>
                        {projects.map((project) => (
                          <li
                            key={project._id}
                            className="bg-gray-800 p-4 rounded-lg mb-4"
                          >
                            <h3 className="text-white text-lg">
                              {project.title}
                            </h3>
                            <p className="text-gray-400">
                              {project.description}
                            </p>
                            <button
                              onClick={() => handleEditProject(project._id)}
                              className="shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-4 py-2 bg-[#0070f3] rounded-md text-white font-light transition duration-200 ease-linear"
                            >
                              Edit
                            </button>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href="/project/new"
                        className="bg-green-600 text-white px-4 py-2 rounded-lg"
                      >
                        Add New Project
                      </Link>
                    </div>
                  ) : (
                    <div>
                      <h2 className="text-white text-2xl mb-4">Edit Project</h2>
                      <div className="bg-gray-800 p-6 rounded-lg mb-4">
                        <label className="text-gray-400">Title</label>
                        <input
                          type="text"
                          name="title"
                          value={newProject?.title || ""}
                          onChange={handleProjectFormChange}
                          className="w-full p-2 bg-gray-700 text-white rounded-lg mb-4"
                        />
                        <label className="text-gray-400">Description</label>
                        <textarea
                          name="description"
                          value={newProject?.description || ""}
                          onChange={handleProjectFormChange}
                          className="w-full p-2 bg-gray-700 text-white rounded-lg mb-4"
                        />
                        <label className="text-gray-400">Technologies</label>
                        <input
                          type="text"
                          name="technologies"
                          value={newProject?.technologies.join(", ") || ""}
                          onChange={(e) => {
                            const inputValue = e.target.value; // Get the value from the input
                            const techArray = inputValue
                              .split(",")
                              .map((tech) => tech.trim())
                              .filter((tech) => tech.length > 0); // Filter out empty entries

                            setNewProject((prev: any) => {
                              if (prev) {
                                return {
                                  ...prev, // Spread the previous state
                                  technologies: techArray, // Update technologies
                                };
                              }
                              return { technologies: techArray }; // If prev is null, create a new object
                            });
                          }}
                          className="w-full p-2 bg-gray-700 text-white rounded-lg mb-4"
                        />
                        <label className="text-gray-400">Status</label>
                        <input
                          type="text"
                          name="status"
                          value={newProject?.status || ""}
                          onChange={handleProjectFormChange}
                          className="w-full p-2 bg-gray-700 text-white rounded-lg mb-4"
                        />
                        <div className="flex justify-end">
                          <button
                            onClick={handleCancelEdit}
                            className="bg-gray-600 text-white px-4 py-2 rounded-lg mr-4"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleUpdateProject}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
