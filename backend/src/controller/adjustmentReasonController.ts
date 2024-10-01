import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CustomError } from "../utils/CustomError";

const prisma = new PrismaClient();

export class AdjustmentReasonController {
  // Create a new AdjustmentReason
  async createAdjustmentReason(req: Request, res: Response): Promise<void> {
    const { reasonName, createdByID, modifiedByID } = req.body;

    try {
      const newAdjustmentReason = await prisma.adjustmentReason.create({
        data: {
          reasonName,
          createdByID,
          modifiedByID,
        },
      });

      res.status(201).json({
        success: true,
        message: "AdjustmentReason created successfully",
        data: newAdjustmentReason,
      });
    } catch (error) {
      throw new CustomError("Error creating adjustment reason", 500);
    }
  }

  // Get all AdjustmentReasons
  async getAllAdjustmentReasons(req: Request, res: Response): Promise<void> {
    try {
      const adjustmentReasons = await prisma.adjustmentReason.findMany();
      res.status(200).json({
        success: true,
        data: adjustmentReasons,
      });
    } catch (error) {
      throw new CustomError("Error fetching adjustment reasons", 500);
    }
  }

  // Get AdjustmentReason by ID
  async getAdjustmentReasonById(req: Request, res: Response): Promise<void> {
    const { adjustmentReasonID } = req.params;

    try {
      const adjustmentReason = await prisma.adjustmentReason.findUnique({
        where: { adjustmentReasonID: parseInt(adjustmentReasonID) },
      });

      if (!adjustmentReason) {
        res.status(404).json({
          success: false,
          message: "AdjustmentReason not found",
        });
      } else {
        res.status(200).json({
          success: true,
          data: adjustmentReason,
        });
      }
    } catch (error) {
      throw new CustomError("Error fetching adjustment reason", 500);
    }
  }

  // Update AdjustmentReason
  async updateAdjustmentReason(req: Request, res: Response): Promise<void> {
    const { adjustmentReasonID } = req.params;
    const { reasonName, modifiedByID } = req.body;

    try {
      const updatedAdjustmentReason = await prisma.adjustmentReason.update({
        where: { adjustmentReasonID: parseInt(adjustmentReasonID) },
        data: {
          reasonName,
          modifiedByID,
        },
      });

      res.status(200).json({
        success: true,
        message: "AdjustmentReason updated successfully",
        data: updatedAdjustmentReason,
      });
    } catch (error) {
      throw new CustomError("Error updating adjustment reason", 500);
    }
  }

  // Delete AdjustmentReason
  async deleteAdjustmentReason(req: Request, res: Response): Promise<void> {
    const { adjustmentReasonID } = req.params;

    try {
      await prisma.adjustmentReason.delete({
        where: { adjustmentReasonID: parseInt(adjustmentReasonID) },
      });

      res.status(200).json({
        success: true,
        message: "AdjustmentReason deleted successfully",
      });
    } catch (error) {
      throw new CustomError("Error deleting adjustment reason", 500);
    }
  }
}
