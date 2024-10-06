"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export default function EditProject() {
  const { id } = useParams(); // Get project ID from the URL
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [techInput, setTechInput] = useState("");
  const [image, setImage] = useState<{ filename: string; url: string }>({
    filename: "",
    url: "",
  });
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("In Progress");
  const [liveLink, setLiveLink] = useState("");
  const [repoLink, setRepoLink] = useState("");
  const [contributors, setContributors] = useState<
    { name: string; role: string }[]
  >([]);
  const [contributorName, setContributorName] = useState("");
  const [contributorRole, setContributorRole] = useState("");
  const [challenges, setChallenges] = useState("");
  const [achievements, setAchievements] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  // Fetch the project data on page load
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const url = new URL(`/api/projects/${id}`, apiUrl);
        const res = await fetch(url.toString());
        if (!res.ok) throw new Error("Failed to fetch project");
        const project = await res.json();
        setTitle(project.title);
        setDescription(project.description);
        setTechnologies(project.technologies || []);
        setImage(project.image || { filename: "", url: "" });
        setStartDate(project.duration.startDate);
        setEndDate(project.duration.endDate || "");
        setStatus(project.status || "In Progress");
        setLiveLink(project.liveLink || "");
        setRepoLink(project.repoLink || "");
        setContributors(project.contributors || []);
        setChallenges(project.challenges || "");
        setAchievements(project.achievements || "");
        setCategory(project.category || "");
        setTags(project.tags || []);
      } catch (err) {
        if (err instanceof Error) {
          // TypeScript now knows that err is of type 'Error'
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };
    fetchProject();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = new URL(`/api/projects/${id}`, apiUrl);
      const res = await fetch(url.toString(), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          technologies,
          image,
          duration: { startDate, endDate },
          status,
          liveLink,
          repoLink,
          contributors,
          challenges,
          achievements,
          category,
          tags,
        }),
      });

      if (!res.ok) throw new Error("Failed to update project");

      router.push(`/projects/${id}`);
    } catch (err) {
      if (err instanceof Error) {
        // TypeScript now knows that err is of type 'Error'
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTechAdd = () => {
    if (techInput) {
      setTechnologies([...technologies, techInput]);
      setTechInput("");
    }
  };

  const handleContributorAdd = () => {
    if (contributorName && contributorRole) {
      setContributors([
        ...contributors,
        { name: contributorName, role: contributorRole },
      ]);
      setContributorName("");
      setContributorRole("");
    }
  };

  const handleTagAdd = () => {
    if (tagInput) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Edit Project</h1>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Field */}
        <div>
          <label className="block text-gray-400">Title</label>
          <input
            className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter project title"
          />
        </div>

        {/* Description Field */}
        <div>
          <label className="block text-gray-400">Description</label>
          <textarea
            className="w-full p-3 h-24 rounded bg-gray-800 text-white focus:outline-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter project description"
          />
        </div>

        {/* Technologies Section */}
        <div>
          <label className="block text-gray-400">Technologies</label>
          <div className="flex space-x-2 mb-3">
            <input
              className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              placeholder="Add a technology"
            />
            <button
              type="button"
              onClick={handleTechAdd}
              className="bg-blue-600 px-4 py-2 rounded text-white"
            >
              Add
            </button>
          </div>

          {/* Display Added Technologies */}
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="bg-blue-600 text-white px-3 py-1 rounded-full flex items-center"
              >
                <span>{tech}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Status Dropdown */}
        <div>
          <label className="block text-gray-400">Status</label>
          <select
            className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Completed">Completed</option>
            <option value="Ongoing">Ongoing</option>
            <option value="In Progress">In Progress</option>
          </select>
        </div>

        {/* Start Date and End Date */}
        <div>
          <label className="block text-gray-400">Start Date</label>
          <input
            className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
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

        {/* Live Link and Repo Link */}
        <div>
          <label className="block text-gray-400">Live Link</label>
          <input
            className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none"
            type="url"
            value={liveLink}
            onChange={(e) => setLiveLink(e.target.value)}
            placeholder="Enter live link"
          />
        </div>

        <div>
          <label className="block text-gray-400">Repository Link</label>
          <input
            className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none"
            type="url"
            value={repoLink}
            onChange={(e) => setRepoLink(e.target.value)}
            placeholder="Enter repository link"
          />
        </div>

        {/* Contributors Section */}
        <div>
          <label className="block text-gray-400">Contributors</label>
          <div className="flex space-x-2 mb-3">
            <input
              className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none"
              value={contributorName}
              onChange={(e) => setContributorName(e.target.value)}
              placeholder="Contributor name"
            />
            <input
              className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none"
              value={contributorRole}
              onChange={(e) => setContributorRole(e.target.value)}
              placeholder="Contributor role"
            />
            <button
              type="button"
              onClick={handleContributorAdd}
              className="bg-blue-600 px-4 py-2 rounded text-white"
            >
              Add
            </button>
          </div>

          {/* Display Added Contributors */}
          <div className="flex flex-wrap gap-2">
            {contributors.map((contributor, index) => (
              <div
                key={index}
                className="bg-blue-600 text-white px-3 py-1 rounded-full"
              >
                {contributor.name} - {contributor.role}
              </div>
            ))}
          </div>
        </div>

        {/* Category, Challenges, Achievements */}
        <div>
          <label className="block text-gray-400">Category</label>
          <input
            className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter project category"
          />
        </div>

        <div>
          <label className="block text-gray-400">Challenges</label>
          <textarea
            className="w-full p-3 h-24 rounded bg-gray-800 text-white focus:outline-none"
            value={challenges}
            onChange={(e) => setChallenges(e.target.value)}
            placeholder="Enter project challenges"
          />
        </div>

        <div>
          <label className="block text-gray-400">Achievements</label>
          <textarea
            className="w-full p-3 h-24 rounded bg-gray-800 text-white focus:outline-none"
            value={achievements}
            onChange={(e) => setAchievements(e.target.value)}
            placeholder="Enter project achievements"
          />
        </div>

        {/* Tags Section */}
        <div>
          <label className="block text-gray-400">Tags</label>
          <div className="flex space-x-2 mb-3">
            <input
              className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Add a tag"
            />
            <button
              type="button"
              onClick={handleTagAdd}
              className="bg-blue-600 px-4 py-2 rounded text-white"
            >
              Add
            </button>
          </div>

          {/* Display Added Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="bg-blue-600 text-white px-3 py-1 rounded-full"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
