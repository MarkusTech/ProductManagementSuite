import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

// Define the interface for the User document
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  photo?: string;
  phone?: string;
  bio?: string;
  slug?: string;
}

// Create the schema for User
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Email address is invalid",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password should be at least 6 characters long"],
    },
    photo: {
      type: String,
      required: [true, "Photo is required"],
      default: "https://robohash.org/default.png",
    },
    phone: {
      type: String,
      default: "+256",
    },
    bio: {
      type: String,
      maxLength: [250, "Bio should not be more than 250 characters long."],
      default: "bio",
    },
    slug: {
      type: String,
    },
  },
  { timestamps: true }
);

// Middleware to hash password before saving the document
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(this.password, salt);
  this.password = hashPassword;

  next();
});

// Create and export the model
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
