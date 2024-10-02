import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CustomError } from "../utils/CustomError";
import logger from "../utils/logger";

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

      logger.info(
        `InventoryAdjustment created: ID ${newInventoryAdjustment.adjustmentID}`
      );

      res.status(201).json({
        success: true,
        message: "InventoryAdjustment created successfully",
        data: newInventoryAdjustment,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.error(`Error creating inventory adjustment: ${error.message}`);
        throw new CustomError("Error creating inventory adjustment", 500);
      }
      logger.error(
        "An unexpected error occurred while creating inventory adjustment"
      );
      throw new CustomError("An unexpected error occurred", 500);
    }
  }

  // Get all InventoryAdjustments
  async getAllInventoryAdjustments(req: Request, res: Response): Promise<void> {
    try {
      const inventoryAdjustments = await prisma.inventoryAdjustment.findMany();
      logger.info("Fetched all inventory adjustments");

      res.status(200).json({
        success: true,
        data: inventoryAdjustments,
      });
    } catch (error) {
      logger.error(
        `Error fetching inventory adjustments: ${(error as Error).message}`
      );
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
        logger.warn(`InventoryAdjustment with ID ${adjustmentID} not found`);
        res.status(404).json({
          success: false,
          message: "InventoryAdjustment not found",
        });
      } else {
        logger.info(`Fetched InventoryAdjustment with ID ${adjustmentID}`);
        res.status(200).json({
          success: true,
          data: inventoryAdjustment,
        });
      }
    } catch (error) {
      logger.error(
        `Error fetching inventory adjustment: ${(error as Error).message}`
      );
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

      logger.info(`InventoryAdjustment with ID ${adjustmentID} updated`);

      res.status(200).json({
        success: true,
        message: "InventoryAdjustment updated successfully",
        data: updatedInventoryAdjustment,
      });
    } catch (error) {
      logger.error(
        `Error updating inventory adjustment: ${(error as Error).message}`
      );
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

      logger.info(`InventoryAdjustment with ID ${adjustmentID} deleted`);

      res.status(200).json({
        success: true,
        message: "InventoryAdjustment deleted successfully",
      });
    } catch (error) {
      logger.error(
        `Error deleting inventory adjustment: ${(error as Error).message}`
      );
      throw new CustomError("Error deleting inventory adjustment", 500);
    }
  }
}
