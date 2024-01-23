import mongoose from "mongoose";
import { SubjectTypes } from "../types/models";

const subjectSchema = new mongoose.Schema<SubjectTypes>({
  subjectName: {
    type: String,
    required: [true, "this field is required"],
  },

  description: {
    type: String,
    required: [true, "this field is required"],
  },
  teacher: {
    type: mongoose.SchemaTypes.ObjectId,
    required: [true, "this field is required"],
    ref: "User",
  },

  class: {
    type: mongoose.SchemaTypes.ObjectId,
    required: [true, "this field is required"],
    ref: "Class",
  },
});

const Subject = mongoose.model<SubjectTypes>("Subjects", subjectSchema);

export default Subject;
