import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CustomError } from "../utils/CustomError";
import logger from "../utils/logger";

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

      logger.info(
        `AdjustmentReason created: ID ${newAdjustmentReason.adjustmentReasonID}`
      );

      res.status(201).json({
        success: true,
        message: "AdjustmentReason created successfully",
        data: newAdjustmentReason,
      });
    } catch (error) {
      logger.error(
        `Error creating adjustment reason: ${(error as Error).message}`
      );
      throw new CustomError("Error creating adjustment reason", 500);
    }
  }

  // Get all AdjustmentReasons
  async getAllAdjustmentReasons(req: Request, res: Response): Promise<void> {
    try {
      const adjustmentReasons = await prisma.adjustmentReason.findMany();
      logger.info("Fetched all adjustment reasons");

      res.status(200).json({
        success: true,
        data: adjustmentReasons,
      });
    } catch (error) {
      logger.error(
        `Error fetching adjustment reasons: ${(error as Error).message}`
      );
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
        logger.warn(`AdjustmentReason with ID ${adjustmentReasonID} not found`);
        throw new CustomError("AdjustmentReason not found", 404);
      } else {
        logger.info(`Fetched adjustment reason with ID ${adjustmentReasonID}`);
        res.status(200).json({
          success: true,
          data: adjustmentReason,
        });
      }
    } catch (error) {
      logger.error(
        `Error fetching adjustment reason: ${(error as Error).message}`
      );
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

      logger.info(`AdjustmentReason with ID ${adjustmentReasonID} updated`);

      res.status(200).json({
        success: true,
        message: "AdjustmentReason updated successfully",
        data: updatedAdjustmentReason,
      });
    } catch (error) {
      logger.error(
        `Error updating adjustment reason: ${(error as Error).message}`
      );
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

      logger.info(`AdjustmentReason with ID ${adjustmentReasonID} deleted`);

      res.status(200).json({
        success: true,
        message: "AdjustmentReason deleted successfully",
      });
    } catch (error) {
      logger.error(
        `Error deleting adjustment reason: ${(error as Error).message}`
      );
      throw new CustomError("Error deleting adjustment reason", 500);
    }
  }
}
