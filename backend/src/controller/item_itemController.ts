import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CustomError } from "../utils/CustomError";
import logger from "../utils/logger";

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

      logger.info(`Item created: ID ${newItem.itemID}, Name ${itemName}`);

      res.status(201).json({
        success: true,
        message: "Item created successfully",
        data: newItem,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.error(`Error creating item: ${error.message}`);
        throw new CustomError("Error creating item", 500);
      }
      logger.error("An unexpected error occurred while creating item");
      throw new CustomError("An unexpected error occurred", 500);
    }
  }

  // Get all items
  async getAllItems(req: Request, res: Response): Promise<void> {
    try {
      const items = await prisma.items.findMany();
      logger.info("Fetched all items");

      res.status(200).json({
        success: true,
        data: items,
      });
    } catch (error) {
      logger.error(`Error fetching items: ${(error as Error).message}`);
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
        logger.warn(`Item with ID ${itemID} not found`);
        res.status(404).json({
          success: false,
          message: "Item not found",
        });
      } else {
        logger.info(`Fetched item with ID ${itemID}`);
        res.status(200).json({
          success: true,
          data: item,
        });
      }
    } catch (error) {
      logger.error(`Error fetching item: ${(error as Error).message}`);
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

      logger.info(`Item with ID ${itemID} updated`);

      res.status(200).json({
        success: true,
        message: "Item updated successfully",
        data: updatedItem,
      });
    } catch (error) {
      logger.error(`Error updating item: ${(error as Error).message}`);
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

      logger.info(`Item with ID ${itemID} deleted`);

      res.status(200).json({
        success: true,
        message: "Item deleted successfully",
      });
    } catch (error) {
      logger.error(`Error deleting item: ${(error as Error).message}`);
      throw new CustomError("Error deleting item", 500);
    }
  }
}
