import mongoose, { Schema, Document, Model } from "mongoose";
import createSlug from "../utils/createSlug";

// Define the interface for the Category document
interface ICategory extends Document {
  category: string;
  slug: string;
}

// Create the schema for the Category
const categorySchema = new Schema<ICategory>(
  {
    category: {
      type: String,
      required: [true, "category is required"],
    },
    slug: {
      type: String,
    },
  },
  { timestamps: true }
);

// Middleware to create slug before saving
categorySchema.pre("save", async function (next) {
  const category = this as ICategory;

  // Optionally, check if slug is already set or not modified
  if (!category.isModified("slug")) {
    return next();
  }

  // Generate slug
  category.slug = createSlug(category.slug);
  next();
});

// Create the model
const Category: Model<ICategory> = mongoose.model<ICategory>(
  "Category",
  categorySchema
);

export default Category;
