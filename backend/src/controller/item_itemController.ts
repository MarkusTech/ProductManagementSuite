import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CustomError } from "../utils/CustomError";

const prisma = new PrismaClient();

export class ItemController {
  // Create a new item
  async createItem(req: Request, res: Response): Promise<void> {
    const {
      itemCode,
      categoryID,
      barcode,
      itemName,
      description,
      grams,
      uom,
      price,
      cost,
      createdByID,
      modifiedByID,
    } = req.body;

    let image_url: string | null = null;

    if (req.file) {
      image_url = req.file.path; // Save the file path
    }

    try {
      const newItem = await prisma.items.create({
        data: {
          itemCode,
          categoryID,
          barcode,
          itemName,
          description,
          grams,
          uom,
          price,
          cost,
          image_url,
          createdByID,
          modifiedByID,
        },
      });

      res.status(201).json({
        success: true,
        message: "Item created successfully",
        data: newItem,
      });
    } catch (error) {
      throw new CustomError("Error creating item", 500);
    }
  }

  // Get all items
  async getAllItems(req: Request, res: Response): Promise<void> {
    try {
      const items = await prisma.items.findMany();
      res.status(200).json({
        success: true,
        data: items,
      });
    } catch (error) {
      throw new CustomError("Error fetching items", 500);
    }
  }

  // Get item by ID
  async getItemById(req: Request, res: Response): Promise<void> {
    const { itemID } = req.params;

    try {
      const item = await prisma.items.findUnique({
        where: { itemID: parseInt(itemID) },
      });

      if (!item) {
        res.status(404).json({
          success: false,
          message: "Item not found",
        });
      } else {
        res.status(200).json({
          success: true,
          data: item,
        });
      }
    } catch (error) {
      throw new CustomError("Error fetching item", 500);
    }
  }

  // Update item
  async updateItem(req: Request, res: Response): Promise<void> {
    const { itemID } = req.params;
    const {
      itemCode,
      categoryID,
      barcode,
      itemName,
      description,
      grams,
      uom,
      price,
      cost,
      image_url,
      modifiedByID,
      status,
    } = req.body;

    try {
      const updatedItem = await prisma.items.update({
        where: { itemID: parseInt(itemID) },
        data: {
          itemCode,
          categoryID,
          barcode,
          itemName,
          description,
          grams,
          uom,
          price,
          cost,
          image_url,
          modifiedByID,
          status,
        },
      });

      res.status(200).json({
        success: true,
        message: "Item updated successfully",
        data: updatedItem,
      });
    } catch (error) {
      throw new CustomError("Error updating item", 500);
    }
  }

  // Delete item
  async deleteItem(req: Request, res: Response): Promise<void> {
    const { itemID } = req.params;

    try {
      await prisma.items.delete({
        where: { itemID: parseInt(itemID) },
      });

      res.status(200).json({
        success: true,
        message: "Item deleted successfully",
      });
    } catch (error) {
      throw new CustomError("Error deleting item", 500);
    }
  }
}
