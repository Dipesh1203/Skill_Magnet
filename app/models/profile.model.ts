import mongoose from "mongoose";
const Schema = mongoose.Schema;
// import { Project } from "./projects.model"; // If unused, you can remove this import.

const profileSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  headline: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200,
  },
  intro: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1000,
  },
  skills: {
    type: [String],
  },
  // Uncomment if needed

  projects: {
    type: [Schema.Types.ObjectId],
    ref: "Project",
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

// Use existing model if it exists, otherwise create a new one
export const Profile =
  mongoose.models.Profile || mongoose.model("Profile", profileSchema);
