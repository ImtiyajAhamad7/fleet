// src/config/db.ts
import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/skillverse";

    await mongoose.connect(mongoURI);

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    throw error; // Let the caller handle the error
  }
};

export default connectDB;
