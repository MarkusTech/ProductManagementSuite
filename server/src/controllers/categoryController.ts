import { Request, Response } from "express";
import Category from "../models/Category"; // Adjust the path based on your structure
import Joi from "joi";

const createCategory = async (req: Request, res: Response) => {
  try {
    const schema = Joi.object({
      category: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const { category } = req.body;

    const categoryExists = await Category.findOne({ category });
    if (categoryExists) return res.status(409).json("Category already exists.");

    const newCategory = new Category({
      category: req.body.category,
      slug: category,
    });
    await newCategory.save();
    return res.status(201).json("Category has been created.");
  } catch (error: unknown) {
    // Type assertion for error
    if (error instanceof Error) {
      return res.status(500).json(error.message);
    } else {
      return res.status(500).json("An unexpected error occurred.");
    }
  }
};

// Similar adjustments for other functions

const categories = async (req: Request, res: Response) => {
  try {
    const categoriesList = await Category.find({});
    return res.status(200).json(categoriesList);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json(error.message);
    } else {
      return res.status(500).json("An unexpected error occurred.");
    }
  }
};

const category = async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug;
    if (!slug) return res.status(404).json("Category was not found.");

    const foundCategory = await Category.findOne({ slug });
    if (!foundCategory) return res.status(404).json("Category was not found.");

    return res.status(200).json(foundCategory);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json(error.message);
    } else {
      return res.status(500).json("An unexpected error occurred.");
    }
  }
};

const updateCategory = async (req: Request, res: Response) => {
  try {
    const schema = Joi.object({
      category: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const id = req.params.id;
    const categoryToUpdate = await Category.findById(id);
    if (!categoryToUpdate)
      return res.status(404).json("Category was not found.");

    categoryToUpdate.category = req.body.category || categoryToUpdate.category;
    const updatedCategory = await categoryToUpdate.save();

    return res.status(200).json(updatedCategory);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json(error.message);
    } else {
      return res.status(500).json("An unexpected error occurred.");
    }
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug;
    if (!slug) return res.status(404).json("Category was not found.");

    const categoryToDelete = await Category.findOne({ slug });
    if (!categoryToDelete)
      return res.status(404).json("Category was not found.");

    await categoryToDelete.deleteOne();

    return res.status(200).json("Category has been deleted.");
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json(error.message);
    } else {
      return res.status(500).json("An unexpected error occurred.");
    }
  }
};

export { createCategory, categories, category, updateCategory, deleteCategory };
