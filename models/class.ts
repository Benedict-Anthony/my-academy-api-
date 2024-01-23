import mongoose, { model } from "mongoose";
import { ClassType } from "../types/models";

const classSchema = new mongoose.Schema<ClassType>(
  {
    name: {
      type: String,
      required: [true, "this field is required"],
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

classSchema.virtual("students", {
  ref: "User",
  localField: "_id",
  foreignField: "_id",
  justOne: false,
});

classSchema.virtual("subjects", {
  ref: "Subjects",
  localField: "_id",
  foreignField: "class",
  justOne: false,
});

const Class = mongoose.model<ClassType>("Class", classSchema);
export default Class;
