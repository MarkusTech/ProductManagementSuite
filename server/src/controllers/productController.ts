import { Request, Response } from "express";
import Product from "../models/Product";
import Joi from "joi";
import cloudinary from "../config/cloudinary.config";

const addProduct = async (req: Request, res: Response) => {
  try {
    const schema = Joi.object({
      product: Joi.string().required().max(30).min(2),
      category: Joi.string().required(),
      price: Joi.string().required(),
      quantity: Joi.number().required(),
      description: Joi.string().required().max(250).min(15),
      image: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const { product, category, price, quantity, description, image } = req.body;

    const productExists = await Product.findOne({ product });
    if (productExists) return res.status(400).json("Product already exists");

    const result = await cloudinary.uploader.upload(image);

    const newProduct = new Product({
      product,
      category,
      price,
      quantity,
      description,
      slug: product,
      image: result.secure_url,
    });

    await newProduct.save();
    return res.status(201).json("Product has been saved.");
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json(error.message);
    } else {
      return res.status(500).json("An unexpected error occurred.");
    }
  }
};

const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({});
    return res.status(200).json(products);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json(error.message);
    } else {
      return res.status(500).json("An unexpected error occurred.");
    }
  }
};

const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json("Product not found.");

    return res.status(200).json(product);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json(error.message);
    } else {
      return res.status(500).json("An unexpected error occurred.");
    }
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const productToUpdate = await Product.findById(id);
    if (!productToUpdate) return res.status(404).json("Product not found.");

    const schema = Joi.object({
      product: Joi.string().max(30).min(2),
      category: Joi.string(),
      price: Joi.string(),
      quantity: Joi.number(),
      description: Joi.string().max(250).min(15),
      image: Joi.string(),
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    Object.assign(productToUpdate, req.body);
    await productToUpdate.save();

    return res.status(200).json("Product has been updated.");
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json(error.message);
    } else {
      return res.status(500).json("An unexpected error occurred.");
    }
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const productToDelete = await Product.findById(id);
    if (!productToDelete) return res.status(404).json("Product not found.");

    await productToDelete.deleteOne();
    return res.status(200).json("Product has been deleted.");
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json(error.message);
    } else {
      return res.status(500).json("An unexpected error occurred.");
    }
  }
};

export { addProduct, getProducts, getProduct, updateProduct, deleteProduct };
