import express, { Request, Response } from "express";
import upload from "../utils/imageUpload";
import { protect } from "../middleware/authMiddleware";
import cloudinary from "../config/cloudinary.config";
import Product from "../models/Product";
import Joi from "joi";

const router = express.Router();

// Route for uploading an image
router.post(
  "/create",
  upload.single("image"),
  protect,
  async (req: Request, res: Response) => {
    try {
      const schema = Joi.object({
        product: Joi.string().required().max(30).min(2),
        category: Joi.string().required(),
        price: Joi.string().required(),
        quantity: Joi.number().required(),
        description: Joi.string().required().max(250).min(15),
      });

      const { error } = schema.validate(req.body);
      if (error) return res.status(400).json(error.details[0].message);

      const { product, category, price, quantity, description } = req.body;

      const productExists = await Product.findOne({
        product: req.body.product,
      });
      if (productExists) return res.status(400).json("Product already exists");

      // Assert that req.file is defined
      const filePath = req.file?.path;
      if (!filePath) return res.status(400).json("Image upload failed");

      const result = await cloudinary.uploader.upload(filePath, {
        folder: "stock",
      });

      const newProduct = new Product({
        product,
        category,
        price,
        quantity,
        description,
        slug: product,
        image: result.secure_url,
        cloudinary_id: result.public_id,
      });

      await newProduct.save();
      return res.status(201).json("Product has been saved.");
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json(error.message);
      }
      return res.status(500).json("An unexpected error occurred.");
    }
  }
);

export default router;
