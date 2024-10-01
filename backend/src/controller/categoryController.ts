import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CustomError } from "../utils/CustomError";

const prisma = new PrismaClient();

export class CategoryController {
  // Create a new category
  async createCategory(req: Request, res: Response): Promise<void> {
    const { categoryCode, categoryName, description, status } = req.body;

    try {
      const newCategory = await prisma.categories.create({
        data: {
          categoryCode,
          categoryName,
          description,
          status,
        },
      });

      res.status(201).json({
        success: true,
        message: "Category created successfully",
        data: newCategory,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new CustomError("Error creating category", 500);
      }
      throw new CustomError("An unexpected error occurred", 500);
    }
  }

  // Get all categories
  async getAllCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories = await prisma.categories.findMany();
      res.status(200).json({
        success: true,
        data: categories,
      });
    } catch (error) {
      throw new CustomError("Error fetching categories", 500);
    }
  }

  // Get category by ID
  async getCategoryById(req: Request, res: Response): Promise<void> {
    const { categoryID } = req.params;

    try {
      const category = await prisma.categories.findUnique({
        where: { categoryID: parseInt(categoryID) },
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
      throw new CustomError("Error fetching category", 500);
    }
  }

  // Update category
  async updateCategory(req: Request, res: Response): Promise<void> {
    const { categoryID } = req.params;
    const { categoryCode, categoryName, description, status } = req.body;

    try {
      const updatedCategory = await prisma.categories.update({
        where: { categoryID: parseInt(categoryID) },
        data: {
          categoryCode,
          categoryName,
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
      throw new CustomError("Error updating category", 500);
    }
  }

  // Delete category
  async deleteCategory(req: Request, res: Response): Promise<void> {
    const { categoryID } = req.params;

    try {
      await prisma.categories.delete({
        where: { categoryID: parseInt(categoryID) },
      });

      res.status(200).json({
        success: true,
        message: "Category deleted successfully",
      });
    } catch (error) {
      throw new CustomError("Error deleting category", 500);
    }
  }
}
