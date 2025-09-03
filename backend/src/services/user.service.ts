import bcrypt from "bcryptjs";
import User, { IUser } from "../models/user.model";
import jwt from "jsonwebtoken";

export class UserService {
  // Register
  static async createUser(data: Partial<IUser>) {
    const hashedPassword = await bcrypt.hash(data.password!, 10);
    const user = new User({ ...data, password: hashedPassword });
    return user.save();
  }

  // Login
  static async loginUser(data: { email: string; password: string }) {
    const { email, password } = data;

    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET! || "@@123@@",
      { expiresIn: "7d" }
    );

    return { user, token, msg: "SuccessFully login" };
  }
}
