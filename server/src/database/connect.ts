import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    mongoose.set("strictQuery", false);

    await mongoose.connect(process.env.MONGO_URI as string);

    console.log("Connected to database.");
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
