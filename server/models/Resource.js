import mongoose from "mongoose";

const ResourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    link: { type: String, required: true },
    category: { type: String, required: true },
    notes: { type: String, default: "" },
  },
  { timestamps: true },
);

export default mongoose.model("Resource", ResourceSchema);
