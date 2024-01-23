import mongoose from "mongoose";
import { UserTypes } from "../types/models";
import bycript from "bcryptjs";

const UserSchema = new mongoose.Schema<UserTypes>({
  username: {
    type: String,
    require: [true, "This field is required"],
    unique: true,
  },

  email: {
    type: String,
    require: [true, "This field is required"],
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "invalid email address"],
  },

  password: {
    type: String,
    require: [true, "This field is required"],
    minlength: 6,
  },
  password_confirm: {
    type: String,
    require: [true, "This field is required"],
    select: false,
  },
  is_active: {
    type: Boolean,
    default: false,
  },
});

UserSchema.pre("save", async function (next) {
  const salt = bycript.genSaltSync(Number(process.env.SALT));
  const password = bycript.hashSync(this.password);

  this.password = password;
  this.password_confirm = password;

  next();
});

const User = mongoose.model<UserTypes>("User", UserSchema);
export default User;
