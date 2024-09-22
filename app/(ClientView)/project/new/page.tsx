"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

const CreateProject = () => {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [technologyInput, setTechnologyInput] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("In Progress");
  const [liveLink, setLiveLink] = useState("");
  const [repoLink, setRepoLink] = useState("");
  const [contributors, setContributors] = useState<
    { name: string; role: string }[]
  >([]);
  const [contributorInput, setContributorInput] = useState({
    name: "",
    role: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleTechnologyAdd = () => {
    if (technologyInput.trim() !== "") {
      setTechnologies([...technologies, technologyInput.trim()]);
      setTechnologyInput("");
    }
  };

  const handleContributorAdd = () => {
    if (
      contributorInput.name.trim() !== "" &&
      contributorInput.role.trim() !== ""
    ) {
      setContributors([...contributors, { ...contributorInput }]);
      setContributorInput({ name: "", role: "" });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          technologies,
          duration: { startDate, endDate },
          status,
          liveLink,
          repoLink,
          contributors,
          userId: session?.user._id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error);
        return;
      }

      const newProject = await response.json();
      router.push(`/project/${newProject._id}`);
    } catch (error) {
      setError("An error occurred while creating the project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto mt-10 bg-gradient-to-r from-bg-black to-customBack_primary_1 rounded-lg shadow-lg">
      <h1 className="text-white text-4xl font-bold mb-6">Create a Project</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading && <p className="text-white mb-4">Loading...</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-400">Project Title</label>
          <input
            className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-400">Description</label>
          <textarea
            className="w-full p-3 h-24 rounded bg-gray-800 text-white focus:outline-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-400">Technologies</label>
          <div className="flex space-x-2 mb-3">
            <input
              className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none"
              type="text"
              value={technologyInput}
              onChange={(e) => setTechnologyInput(e.target.value)}
            />
            <button
              type="button"
              onClick={handleTechnologyAdd}
              className="bg-[#576CBC] px-4 py-2 rounded text-white"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="bg-[#576bbcd6] text-white px-3 py-1 rounded-full flex items-center space-x-2"
              >
                <span>{tech}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-gray-400">Start Date</label>
          <input
            className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-400">End Date</label>
          <input
            className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-400">Status</label>
          <select
            className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Ongoing">Ongoing</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-400">Live Link</label>
          <input
            className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none"
            type="url"
            value={liveLink}
            onChange={(e) => setLiveLink(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-400">Repository Link</label>
          <input
            className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none"
            type="url"
            value={repoLink}
            onChange={(e) => setRepoLink(e.target.value)}
          />
        </div>
        <div>
          <label className="text-white">Contributor Name:</label>
          <input
            type="text"
            name="name"
            value={contributorInput.name}
            onChange={(e) =>
              setContributorInput({ ...contributorInput, name: e.target.value })
            }
            className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none"
          />
          <label className="text-white">Role:</label>
          <input
            type="text"
            name="role"
            value={contributorInput.role}
            onChange={(e) =>
              setContributorInput({ ...contributorInput, role: e.target.value })
            }
            className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none"
          />
          <button
            type="button"
            onClick={handleContributorAdd}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Contributor
          </button>
          <div className="flex flex-wrap gap-2 mt-2">
            {contributors.map((contributor, index) => (
              <div
                key={index}
                className="bg-[#576bbcd6] text-white px-3 py-1 rounded-full flex items-center space-x-2"
              >
                <span>
                  {contributor.name} - {contributor.role}
                </span>
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-[#576CBC] text-white py-3 rounded-lg mt-4"
          disabled={loading}
        >
          Create Project
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
