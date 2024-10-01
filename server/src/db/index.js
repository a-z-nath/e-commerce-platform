import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const dbInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `MongoDB is connected!!! \n~~DB Host: ${dbInstance.connection.host}`
    );
  } catch (error) {
    console.log(`MongoDB connection is FAILED. ~ ${error}`);
    process.exit(1);
  }
};

export { connectDB };
