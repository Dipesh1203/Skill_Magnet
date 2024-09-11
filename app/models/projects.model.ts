import mongoose from "mongoose";
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 50,
    maxlength: 300,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
    required: true,
  },
  ownerProfile: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
  },
});

export const Project =
  mongoose.models.projects || mongoose.model("Project", projectSchema);
