// src/@types/express.d.ts
import { User as UserModel } from "../models/User"; // Adjust the import based on your User model location

declare global {
  namespace Express {
    interface Request {
      user?: UserModel; // Assuming UserModel is the type of your user object
    }
  }
}
