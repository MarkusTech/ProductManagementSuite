import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CustomError } from "../utils/CustomError";

const prisma = new PrismaClient();

export class PoReceivingController {
  // Create a new poReceiving
  async createPoReceiving(req: Request, res: Response): Promise<void> {
    const {
      poID,
      receivedDate,
      referenceNumber,
      totalCost,
      totalQty,
      status,
      receivedByID,
    } = req.body;

    try {
      const newPoReceiving = await prisma.poReceiving.create({
        data: {
          poID,
          receivedDate,
          referenceNumber,
          totalCost,
          totalQty,
          status,
          receivedByID,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      res.status(201).json({
        success: true,
        message: "PO Receiving created successfully",
        data: newPoReceiving,
      });
    } catch (error) {
      throw new CustomError("Error creating PO receiving", 500);
    }
  }

  // Get all poReceiving records
  async getAllPoReceiving(req: Request, res: Response): Promise<void> {
    try {
      const poReceivingRecords = await prisma.poReceiving.findMany();
      res.status(200).json({
        success: true,
        data: poReceivingRecords,
      });
    } catch (error) {
      throw new CustomError("Error fetching PO receiving records", 500);
    }
  }

  // Get poReceiving by ID
  async getPoReceivingById(req: Request, res: Response): Promise<void> {
    const { poReceivingID } = req.params;

    try {
      const poReceiving = await prisma.poReceiving.findUnique({
        where: { poReceivingID: parseInt(poReceivingID) },
      });

      if (!poReceiving) {
        res.status(404).json({
          success: false,
          message: "PO Receiving not found",
        });
      } else {
        res.status(200).json({
          success: true,
          data: poReceiving,
        });
      }
    } catch (error) {
      throw new CustomError("Error fetching PO receiving", 500);
    }
  }

  // Update poReceiving
  async updatePoReceiving(req: Request, res: Response): Promise<void> {
    const { poReceivingID } = req.params;
    const {
      poID,
      receivedDate,
      referenceNumber,
      totalCost,
      totalQty,
      status,
      receivedByID,
    } = req.body;

    try {
      const updatedPoReceiving = await prisma.poReceiving.update({
        where: { poReceivingID: parseInt(poReceivingID) },
        data: {
          poID,
          receivedDate,
          referenceNumber,
          totalCost,
          totalQty,
          status,
          receivedByID,
          updatedAt: new Date(),
        },
      });

      res.status(200).json({
        success: true,
        message: "PO Receiving updated successfully",
        data: updatedPoReceiving,
      });
    } catch (error) {
      throw new CustomError("Error updating PO receiving", 500);
    }
  }

  // Delete poReceiving
  async deletePoReceiving(req: Request, res: Response): Promise<void> {
    const { poReceivingID } = req.params;

    try {
      await prisma.poReceiving.delete({
        where: { poReceivingID: parseInt(poReceivingID) },
      });

      res.status(200).json({
        success: true,
        message: "PO Receiving deleted successfully",
      });
    } catch (error) {
      throw new CustomError("Error deleting PO receiving", 500);
    }
  }
}
