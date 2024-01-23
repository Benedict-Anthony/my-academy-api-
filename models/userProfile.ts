import mongoose from "mongoose";
import { UserProfileTypes } from "../types/models";

const profileSchema = new mongoose.Schema<UserProfileTypes>(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      required: [true, "this field is required"],
      ref: "User",
      unique: true,
    },
    class: {
      type: mongoose.SchemaTypes.ObjectId,
      required: [true, "this field is required"],
      ref: "Class",
    },
    surname: {
      type: String,
      required: [true, "this field is required"],
    },
    firstName: {
      type: String,
      required: [true, "this field is required"],
    },
    lastName: {
      type: String,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

const StudentProfile = mongoose.model<UserProfileTypes>(
  "Profile",
  profileSchema
);
export default StudentProfile;
