import mongoose, { Schema, Document, Model } from "mongoose";
import createSlug from "../utils/createSlug";

// Define the interface for the Product document
interface IProduct extends Document {
  product: string;
  category: string;
  price: string;
  quantity: number;
  description: string;
  image: string;
  slug?: string;
  cloudinary_id?: string;
}

// Create the schema for Product
const productSchema = new Schema<IProduct>(
  {
    product: {
      type: String,
      required: [true, "Product is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    price: {
      type: String,
      required: [true, "Price is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
    },
    description: {
      type: String,
      required: [true, "Product details are required"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    slug: {
      type: String,
    },
    cloudinary_id: {
      type: String,
    },
  },
  { timestamps: true }
);

// Middleware to create slug before saving
productSchema.pre("save", async function (next) {
  const product = this as IProduct;

  // If the slug is not modified, skip this part
  if (!product.isModified("slug")) {
    return next();
  }

  // Generate slug
  product.slug = createSlug(product.slug || product.product); // Use product name if slug is undefined
  next();
});

// Create and export the model
const Product: Model<IProduct> = mongoose.model<IProduct>(
  "Product",
  productSchema
);

export default Product;
