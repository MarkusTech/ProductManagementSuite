import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CustomError } from "../utils/CustomError";

const prisma = new PrismaClient();

export class PoReceivingItemController {
  // Create a new poReceivingItem
  async createPoReceivingItem(req: Request, res: Response): Promise<void> {
    const { itemID, uom, receivedQty, unitCost } = req.body;

    try {
      const newPoReceivingItem = await prisma.poReceivingItem.create({
        data: {
          itemID,
          uom,
          receivedQty,
          unitCost,
        },
      });

      res.status(201).json({
        success: true,
        message: "PO Receiving Item created successfully",
        data: newPoReceivingItem,
      });
    } catch (error) {
      throw new CustomError("Error creating PO receiving item", 500);
    }
  }

  // Get all poReceivingItems
  async getAllPoReceivingItems(req: Request, res: Response): Promise<void> {
    try {
      const poReceivingItems = await prisma.poReceivingItem.findMany();
      res.status(200).json({
        success: true,
        data: poReceivingItems,
      });
    } catch (error) {
      throw new CustomError("Error fetching PO receiving items", 500);
    }
  }

  // Get poReceivingItem by ID
  async getPoReceivingItemById(req: Request, res: Response): Promise<void> {
    const { poReceivingItemID } = req.params;

    try {
      const poReceivingItem = await prisma.poReceivingItem.findUnique({
        where: { poReceivingItemID: parseInt(poReceivingItemID) },
      });

      if (!poReceivingItem) {
        res.status(404).json({
          success: false,
          message: "PO Receiving Item not found",
        });
      } else {
        res.status(200).json({
          success: true,
          data: poReceivingItem,
        });
      }
    } catch (error) {
      throw new CustomError("Error fetching PO receiving item", 500);
    }
  }

  // Update poReceivingItem
  async updatePoReceivingItem(req: Request, res: Response): Promise<void> {
    const { poReceivingItemID } = req.params;
    const { itemID, uom, receivedQty, unitCost } = req.body;

    try {
      const updatedPoReceivingItem = await prisma.poReceivingItem.update({
        where: { poReceivingItemID: parseInt(poReceivingItemID) },
        data: {
          itemID,
          uom,
          receivedQty,
          unitCost,
        },
      });

      res.status(200).json({
        success: true,
        message: "PO Receiving Item updated successfully",
        data: updatedPoReceivingItem,
      });
    } catch (error) {
      throw new CustomError("Error updating PO receiving item", 500);
    }
  }

  // Delete poReceivingItem
  async deletePoReceivingItem(req: Request, res: Response): Promise<void> {
    const { poReceivingItemID } = req.params;

    try {
      await prisma.poReceivingItem.delete({
        where: { poReceivingItemID: parseInt(poReceivingItemID) },
      });

      res.status(200).json({
        success: true,
        message: "PO Receiving Item deleted successfully",
      });
    } catch (error) {
      throw new CustomError("Error deleting PO receiving item", 500);
    }
  }
}
