"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { CldUploadButton } from "next-cloudinary";

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
  const [image, setImageUrls] = useState<string[]>([]);
  const [imageUploading, setImageUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleTechnologyAdd = () => {
    if (technologyInput.trim() !== "") {
      setTechnologies([...technologies, technologyInput.trim()]);
      setTechnologyInput("");
    }
  };

  const handleTechnologyRemove = (index: number) => {
    setTechnologies(technologies.filter((_, i) => i !== index));
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

  const handleContributorRemove = (index: number) => {
    setContributors(contributors.filter((_, i) => i !== index));
  };

  const handleImageUpload = (result: any) => {
    if (result.info && result.info.secure_url) {
      setImageUrls((prevUrls) => [...prevUrls, result.info.secure_url]);
    }
    setImageUploading(false); // Set to false once the upload is complete
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

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
          image,
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
      setSuccess("Project created successfully!");

      // Clear form after successful submission
      setTitle("");
      setDescription("");
      setTechnologies([]);
      setImageUrls([]);
      setContributors([]);
      setStartDate("");
      setEndDate("");
      setLiveLink("");
      setRepoLink("");

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
      {success && <p className="text-green-500 mb-4">{success}</p>}
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
        <div className="px-8 py-4 rounded-md bg-teal-900 border-dashed border-2 border-sky-500 dark:bg-teal-800 dark:border-sky-400">
          <label className="block text-gray-300 dark:text-gray-200 text-lg font-semibold mb-2">
            Update Project Images
          </label>
          <CldUploadButton
            uploadPreset="skill_magnet_image"
            className="px-6 py-2 rounded-md bg-teal-600 text-white font-bold transition duration-200 hover:bg-teal-500 hover:text-white dark:bg-teal-500 dark:hover:bg-teal-400"
            onSuccess={handleImageUpload}
          />

          <div className="flex flex-wrap mt-4">
            {image.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Uploaded Image ${index + 1}`}
                className="m-4 w-32 h-32 rounded-full border-2 border-gray-300 dark:border-gray-700"
              />
            ))}
          </div>
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
                <button
                  type="button"
                  className="text-red-500 ml-2"
                  onClick={() => handleTechnologyRemove(index)}
                >
                  Remove
                </button>
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
          <label className="block text-gray-400">Contributors</label>
          <div className="flex space-x-2 mb-3">
            <input
              className="w-1/2 p-3 rounded bg-gray-800 text-white focus:outline-none"
              type="text"
              placeholder="Name"
              value={contributorInput.name}
              onChange={(e) =>
                setContributorInput({
                  ...contributorInput,
                  name: e.target.value,
                })
              }
            />
            <input
              className="w-1/2 p-3 rounded bg-gray-800 text-white focus:outline-none"
              type="text"
              placeholder="Role"
              value={contributorInput.role}
              onChange={(e) =>
                setContributorInput({
                  ...contributorInput,
                  role: e.target.value,
                })
              }
            />
            <button
              type="button"
              onClick={handleContributorAdd}
              className="bg-[#576CBC] px-4 py-2 rounded text-white"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {contributors.map((contributor, index) => (
              <div
                key={index}
                className="bg-[#576bbcd6] text-white px-3 py-1 rounded-full flex items-center space-x-2"
              >
                <span>
                  {contributor.name} - {contributor.role}
                </span>
                <button
                  type="button"
                  className="text-red-500 ml-2"
                  onClick={() => handleContributorRemove(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
        <Button
          type="submit"
          className="w-full p-3 rounded bg-[#576CBC] text-white"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Project"}
        </Button>
      </form>
    </div>
  );
};

export default CreateProject;
