import mongoose from "mongoose";
import { env } from "./env.js";
import logger from "../logger/logger.js";

const connectDB = async () => {
  try {
    const connectionString = env.DB_CONNECTION_STRING;
    await mongoose.connect(connectionString);
    logger.info("Connected to database successfully");
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

export default connectDB;
