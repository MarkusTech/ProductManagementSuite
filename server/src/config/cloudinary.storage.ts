import multer, { StorageEngine } from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env" });

// Configure Cloudinary credentials
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Configure Cloudinary storage for multer
const storage: StorageEngine = multer.memoryStorage(); // Use memory storage for Cloudinary uploads

export default storage;
