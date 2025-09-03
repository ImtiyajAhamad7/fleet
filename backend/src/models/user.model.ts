import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "freelancer" | "client";
}

const userSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["freelancer", "client"], default: "client" },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);
