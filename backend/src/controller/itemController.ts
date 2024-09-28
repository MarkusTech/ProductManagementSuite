// src/controllers/ItemController.ts

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
      locationID,
      sku,
      barcode,
      itemName,
      description,
      diff1,
      diff2,
      uom,
      price,
      cost,
      image_url,
      createdByID,
      modifiedByID,
    } = req.body;

    try {
      const newItem = await prisma.item.create({
        data: {
          itemCode,
          categoryID,
          locationID,
          sku,
          barcode,
          itemName,
          description,
          diff1,
          diff2,
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new CustomError("Error creating item", 500);
      }
      throw new CustomError("An unexpected error occurred", 500);
    }
  }

  // Get all items
  async getAllItems(req: Request, res: Response): Promise<void> {
    try {
      const items = await prisma.item.findMany();
      res.status(200).json({
        success: true,
        data: items,
      });
    } catch (error) {
      console.error(error);
      throw new CustomError("Error fetching items", 500);
    }
  }

  // Get item by ID
  async getItemById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const item = await prisma.item.findUnique({
        where: { itemID: parseInt(id) },
      });

      if (!item) {
        throw new CustomError("Item not found", 404);
      } else {
        res.status(200).json({
          success: true,
          data: item,
        });
      }
    } catch (error) {
      console.error(error);
      throw new CustomError("Error fetching item", 500);
    }
  }

  // Update item
  async updateItem(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const {
      itemCode,
      categoryID,
      locationID,
      sku,
      barcode,
      itemName,
      description,
      diff1,
      diff2,
      uom,
      price,
      cost,
      image_url,
      modifiedByID,
    } = req.body;

    try {
      const updatedItem = await prisma.item.update({
        where: { itemID: parseInt(id) },
        data: {
          itemCode,
          categoryID,
          locationID,
          sku,
          barcode,
          itemName,
          description,
          diff1,
          diff2,
          uom,
          price,
          cost,
          image_url,
          modifiedByID,
        },
      });

      res.status(200).json({
        success: true,
        message: "Item updated successfully",
        data: updatedItem,
      });
    } catch (error) {
      console.error(error);
      throw new CustomError("Error updating item", 500);
    }
  }

  // Delete item
  async deleteItem(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      await prisma.item.delete({
        where: { itemID: parseInt(id) },
      });

      res.status(200).json({
        success: true,
        message: "Item deleted successfully",
      });
    } catch (error) {
      console.error(error);
      throw new CustomError("Error deleting item", 500);
    }
  }
}
