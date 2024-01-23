import { ObjectId, Document } from "mongoose";
// user schema types
export interface UserTypes extends Document {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
  is_active: boolean;
}

export interface UserProfileTypes extends Document {
  surname: string;
  firstName: string;
  lastName: string;
  class: ObjectId;
  user: ObjectId;
}

export interface ClassType extends Document {
  name: string;
}

export interface SubjectTypes extends Document {
  subjectName: string;
  description: string;
  teacher: ObjectId;
  class: ObjectId;
}
