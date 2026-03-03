import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ownerId: {
      type: String,
      required: true,
    },
    progress: {
      type: String,
      required: true,
      default: "0",
    },
  },
  { timestamps: true },
);

export const ProjectModel = mongoose.model("Project", projectSchema);
