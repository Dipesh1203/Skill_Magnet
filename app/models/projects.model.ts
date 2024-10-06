import mongoose, { Document, Schema } from "mongoose";
export interface IProject extends Document {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string[]; // Changed to string[] to match the incoming data
  duration: {
    startDate: Date;
    endDate?: Date;
  };
  status: "Completed" | "Ongoing" | "In Progress";
  liveLink?: string | null;
  repoLink?: string;
  contributors?: {
    name: string;
    role: string;
  }[];
  challenges?: string;
  achievements?: string;
  category?: string;
  tags?: string[];
  feedback?: {
    username: string;
    comment: string;
  }[];
  ownerProfile: mongoose.Types.ObjectId;
}

// Define the Project schema
const projectSchema = new Schema<IProject>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  technologies: [
    {
      type: String,
      required: true,
    },
  ],
  image: {
    type: [String], // This is how you define an array of strings (URLs)
    required: true,
  },
  duration: {
    startDate: {
      type: Date,
      required: true,
    },
    endDate: Date, // Optional, if the project is ongoing
  },
  status: {
    type: String,
    enum: ["Completed", "Ongoing", "In Progress"],
    default: "In Progress",
  },
  liveLink: {
    type: String, // URL to live demo
    trim: true,
  },
  repoLink: {
    type: String, // URL to GitHub or any repository
    trim: true,
  },
  contributors: [
    {
      name: String,
      role: String,
    },
  ],
  challenges: {
    type: String,
    trim: true,
  },
  achievements: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
  },
  tags: [
    {
      type: String,
    },
  ],
  feedback: [
    {
      username: String,
      comment: String,
    },
  ],
  ownerProfile: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
  },
});

export const Project =
  mongoose.models.Project || mongoose.model<IProject>("Project", projectSchema);
