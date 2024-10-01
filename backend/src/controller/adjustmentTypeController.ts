import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CustomError } from "../utils/CustomError";

const prisma = new PrismaClient();

export class AdjustmentTypeController {
  // Create a new AdjustmentType
  async createAdjustmentType(req: Request, res: Response): Promise<void> {
    const { typeName, createdByID, modifiedByID } = req.body;

    try {
      const newAdjustmentType = await prisma.adjustmentType.create({
        data: {
          typeName,
          createdByID,
          modifiedByID,
        },
      });

      res.status(201).json({
        success: true,
        message: "AdjustmentType created successfully",
        data: newAdjustmentType,
      });
    } catch (error) {
      throw new CustomError("Error creating adjustment type", 500);
    }
  }

  // Get all AdjustmentTypes
  async getAllAdjustmentTypes(req: Request, res: Response): Promise<void> {
    try {
      const adjustmentTypes = await prisma.adjustmentType.findMany();
      res.status(200).json({
        success: true,
        data: adjustmentTypes,
      });
    } catch (error) {
      throw new CustomError("Error fetching adjustment types", 500);
    }
  }

  // Get AdjustmentType by ID
  async getAdjustmentTypeById(req: Request, res: Response): Promise<void> {
    const { adjustmentTypeID } = req.params;

    try {
      const adjustmentType = await prisma.adjustmentType.findUnique({
        where: { adjustmentTypeID: parseInt(adjustmentTypeID) },
      });

      if (!adjustmentType) {
        res.status(404).json({
          success: false,
          message: "AdjustmentType not found",
        });
      } else {
        res.status(200).json({
          success: true,
          data: adjustmentType,
        });
      }
    } catch (error) {
      throw new CustomError("Error fetching adjustment type", 500);
    }
  }

  // Update AdjustmentType
  async updateAdjustmentType(req: Request, res: Response): Promise<void> {
    const { adjustmentTypeID } = req.params;
    const { typeName, modifiedByID } = req.body;

    try {
      const updatedAdjustmentType = await prisma.adjustmentType.update({
        where: { adjustmentTypeID: parseInt(adjustmentTypeID) },
        data: {
          typeName,
          modifiedByID,
        },
      });

      res.status(200).json({
        success: true,
        message: "AdjustmentType updated successfully",
        data: updatedAdjustmentType,
      });
    } catch (error) {
      throw new CustomError("Error updating adjustment type", 500);
    }
  }

  // Delete AdjustmentType
  async deleteAdjustmentType(req: Request, res: Response): Promise<void> {
    const { adjustmentTypeID } = req.params;

    try {
      await prisma.adjustmentType.delete({
        where: { adjustmentTypeID: parseInt(adjustmentTypeID) },
      });

      res.status(200).json({
        success: true,
        message: "AdjustmentType deleted successfully",
      });
    } catch (error) {
      throw new CustomError("Error deleting adjustment type", 500);
    }
  }
}
