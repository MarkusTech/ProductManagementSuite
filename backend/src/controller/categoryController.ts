// controllers/CategoryController.ts

import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CustomError } from "../utils/CustomError"; // Import the CustomError class

const prisma = new PrismaClient();

export class CategoryController {
  // Create a new category
  async createCategory(req: Request, res: Response): Promise<void> {
    const { categoryCode, name, description, status } = req.body;

    try {
      const newCategory = await prisma.category.create({
        data: {
          categoryCode,
          name,
          description,
          status,
        },
      });

      res.status(201).json({
        success: true,
        message: "Category created successfully",
        data: newCategory,
      });
    } catch (error) {
      // Use CustomError to throw the error
      throw new CustomError("Error creating category", 500);
    }
  }

  // Get all categories
  async getAllCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories = await prisma.category.findMany();
      res.status(200).json({
        success: true,
        data: categories,
      });
    } catch (error) {
      // Use CustomError to throw the error
      throw new CustomError("Error fetching categories", 500);
    }
  }

  // Get category by ID
  async getCategoryById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const category = await prisma.category.findUnique({
        where: { id: parseInt(id) },
      });

      if (!category) {
        throw new CustomError("Category not found", 404);
      } else {
        res.status(200).json({
          success: true,
          data: category,
        });
      }
    } catch (error) {
      // Use CustomError to throw the error
      throw new CustomError("Error fetching category", 500);
    }
  }

  // Update category
  async updateCategory(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { categoryCode, name, description, status } = req.body;

    try {
      const updatedCategory = await prisma.category.update({
        where: { id: parseInt(id) },
        data: {
          categoryCode,
          name,
          description,
          status,
        },
      });

      res.status(200).json({
        success: true,
        message: "Category updated successfully",
        data: updatedCategory,
      });
    } catch (error) {
      // Use CustomError to throw the error
      throw new CustomError("Error updating category", 500);
    }
  }

  // Delete category
  async deleteCategory(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      await prisma.category.delete({
        where: { id: parseInt(id) },
      });

      res.status(200).json({
        success: true,
        message: "Category deleted successfully",
      });
    } catch (error) {
      // Use CustomError to throw the error
      throw new CustomError("Error deleting category", 500);
    }
  }
}
