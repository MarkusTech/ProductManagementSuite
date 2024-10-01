import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CustomError } from "../utils/CustomError";

const prisma = new PrismaClient();

export class InventoryTypeController {
  // Create a new InventoryType
  async createInventoryType(req: Request, res: Response): Promise<void> {
    const { typeName, description, createdByID } = req.body;

    try {
      const newInventoryType = await prisma.inventoryType.create({
        data: {
          typeName,
          description,
          createdByID,
        },
      });

      res.status(201).json({
        success: true,
        message: "InventoryType created successfully",
        data: newInventoryType,
      });
    } catch (error) {
      throw new CustomError("Error creating inventory type", 500);
    }
  }

  // Get all InventoryTypes
  async getAllInventoryTypes(req: Request, res: Response): Promise<void> {
    try {
      const inventoryTypes = await prisma.inventoryType.findMany();
      res.status(200).json({
        success: true,
        data: inventoryTypes,
      });
    } catch (error) {
      throw new CustomError("Error fetching inventory types", 500);
    }
  }

  // Get InventoryType by ID
  async getInventoryTypeById(req: Request, res: Response): Promise<void> {
    const { inventoryTypeID } = req.params;

    try {
      const inventoryType = await prisma.inventoryType.findUnique({
        where: { inventoryTypeID: parseInt(inventoryTypeID) },
      });

      if (!inventoryType) {
        res.status(404).json({
          success: false,
          message: "InventoryType not found",
        });
      } else {
        res.status(200).json({
          success: true,
          data: inventoryType,
        });
      }
    } catch (error) {
      throw new CustomError("Error fetching inventory type", 500);
    }
  }

  // Update InventoryType
  async updateInventoryType(req: Request, res: Response): Promise<void> {
    const { inventoryTypeID } = req.params;
    const { typeName, description, status, modifiedByID } = req.body;

    try {
      const updatedInventoryType = await prisma.inventoryType.update({
        where: { inventoryTypeID: parseInt(inventoryTypeID) },
        data: {
          typeName,
          description,
          status,
          modifiedByID,
        },
      });

      res.status(200).json({
        success: true,
        message: "InventoryType updated successfully",
        data: updatedInventoryType,
      });
    } catch (error) {
      throw new CustomError("Error updating inventory type", 500);
    }
  }

  // Delete InventoryType
  async deleteInventoryType(req: Request, res: Response): Promise<void> {
    const { inventoryTypeID } = req.params;

    try {
      await prisma.inventoryType.delete({
        where: { inventoryTypeID: parseInt(inventoryTypeID) },
      });

      res.status(200).json({
        success: true,
        message: "InventoryType deleted successfully",
      });
    } catch (error) {
      throw new CustomError("Error deleting inventory type", 500);
    }
  }
}
