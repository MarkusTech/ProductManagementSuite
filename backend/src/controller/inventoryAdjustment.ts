import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CustomError } from "../utils/CustomError";

const prisma = new PrismaClient();

export class InventoryAdjustmentController {
  // Create a new InventoryAdjustment
  async createInventoryAdjustment(req: Request, res: Response): Promise<void> {
    const {
      inventoryID,
      adjustmentTypeID,
      adjustmentReasonID,
      quantityAdjusted,
      status,
      createdByID,
    } = req.body;

    try {
      const newInventoryAdjustment = await prisma.inventoryAdjustment.create({
        data: {
          inventoryID,
          adjustmentTypeID,
          adjustmentReasonID,
          quantityAdjusted,
          status,
          createdByID,
        },
      });

      res.status(201).json({
        success: true,
        message: "InventoryAdjustment created successfully",
        data: newInventoryAdjustment,
      });
    } catch (error) {
      throw new CustomError("Error creating inventory adjustment", 500);
    }
  }

  // Get all InventoryAdjustments
  async getAllInventoryAdjustments(req: Request, res: Response): Promise<void> {
    try {
      const inventoryAdjustments = await prisma.inventoryAdjustment.findMany();
      res.status(200).json({
        success: true,
        data: inventoryAdjustments,
      });
    } catch (error) {
      throw new CustomError("Error fetching inventory adjustments", 500);
    }
  }

  // Get InventoryAdjustment by ID
  async getInventoryAdjustmentById(req: Request, res: Response): Promise<void> {
    const { adjustmentID } = req.params;

    try {
      const inventoryAdjustment = await prisma.inventoryAdjustment.findUnique({
        where: { adjustmentID: parseInt(adjustmentID) },
      });

      if (!inventoryAdjustment) {
        res.status(404).json({
          success: false,
          message: "InventoryAdjustment not found",
        });
      } else {
        res.status(200).json({
          success: true,
          data: inventoryAdjustment,
        });
      }
    } catch (error) {
      throw new CustomError("Error fetching inventory adjustment", 500);
    }
  }

  // Update InventoryAdjustment
  async updateInventoryAdjustment(req: Request, res: Response): Promise<void> {
    const { adjustmentID } = req.params;
    const {
      inventoryID,
      adjustmentTypeID,
      adjustmentReasonID,
      quantityAdjusted,
      status,
      modifiedByID,
    } = req.body;

    try {
      const updatedInventoryAdjustment =
        await prisma.inventoryAdjustment.update({
          where: { adjustmentID: parseInt(adjustmentID) },
          data: {
            inventoryID,
            adjustmentTypeID,
            adjustmentReasonID,
            quantityAdjusted,
            status,
            modifiedByID,
          },
        });

      res.status(200).json({
        success: true,
        message: "InventoryAdjustment updated successfully",
        data: updatedInventoryAdjustment,
      });
    } catch (error) {
      throw new CustomError("Error updating inventory adjustment", 500);
    }
  }

  // Delete InventoryAdjustment
  async deleteInventoryAdjustment(req: Request, res: Response): Promise<void> {
    const { adjustmentID } = req.params;

    try {
      await prisma.inventoryAdjustment.delete({
        where: { adjustmentID: parseInt(adjustmentID) },
      });

      res.status(200).json({
        success: true,
        message: "InventoryAdjustment deleted successfully",
      });
    } catch (error) {
      throw new CustomError("Error deleting inventory adjustment", 500);
    }
  }
}
