import mongoose, { Document, Schema } from "mongoose";

// Define the Profile interface
export interface IProfile extends Document {
  name: string;
  userName: string;
  email: string;
  image?: string;
  headline: string;
  intro: string;
  skills?: string[];
  projects?: mongoose.Types.ObjectId[];
  owner: mongoose.Types.ObjectId;
}

// Define the Profile schema
const profileSchema = new Schema<IProfile>({
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
  mongoose.models.Profile || mongoose.model<IProfile>("Profile", profileSchema);
