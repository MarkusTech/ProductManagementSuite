import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CustomError } from "../utils/CustomError";

const prisma = new PrismaClient();

export class InventoryController {
  // Create a new inventory record
  async createInventory(req: Request, res: Response): Promise<void> {
    const { locationID, itemID, quantity, inventoryTypeID, reOrderThreshold } =
      req.body;

    try {
      const newInventory = await prisma.inventory.create({
        data: {
          locationID,
          itemID,
          quantity,
          inventoryTypeID,
          reOrderThreshold,
        },
      });

      res.status(201).json({
        success: true,
        message: "Inventory created successfully",
        data: newInventory,
      });
    } catch (error) {
      throw new CustomError("Error creating inventory", 500);
    }
  }

  // Get all inventory records
  async getAllInventory(req: Request, res: Response): Promise<void> {
    try {
      const inventory = await prisma.inventory.findMany();
      res.status(200).json({
        success: true,
        data: inventory,
      });
    } catch (error) {
      throw new CustomError("Error fetching inventory", 500);
    }
  }

  // Get inventory by ID
  async getInventoryById(req: Request, res: Response): Promise<void> {
    const { inventoryID } = req.params;

    try {
      const inventory = await prisma.inventory.findUnique({
        where: { inventoryID: parseInt(inventoryID) },
      });

      if (!inventory) {
        res.status(404).json({
          success: false,
          message: "Inventory not found",
        });
      } else {
        res.status(200).json({
          success: true,
          data: inventory,
        });
      }
    } catch (error) {
      throw new CustomError("Error fetching inventory", 500);
    }
  }

  // Update inventory
  async updateInventory(req: Request, res: Response): Promise<void> {
    const { inventoryID } = req.params;
    const { locationID, itemID, quantity, inventoryTypeID, reOrderThreshold } =
      req.body;

    try {
      const updatedInventory = await prisma.inventory.update({
        where: { inventoryID: parseInt(inventoryID) },
        data: {
          locationID,
          itemID,
          quantity,
          inventoryTypeID,
          reOrderThreshold,
        },
      });

      res.status(200).json({
        success: true,
        message: "Inventory updated successfully",
        data: updatedInventory,
      });
    } catch (error) {
      throw new CustomError("Error updating inventory", 500);
    }
  }

  // Delete inventory
  async deleteInventory(req: Request, res: Response): Promise<void> {
    const { inventoryID } = req.params;

    try {
      await prisma.inventory.delete({
        where: { inventoryID: parseInt(inventoryID) },
      });

      res.status(200).json({
        success: true,
        message: "Inventory deleted successfully",
      });
    } catch (error) {
      throw new CustomError("Error deleting inventory", 500);
    }
  }
}
