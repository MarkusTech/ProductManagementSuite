import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CustomError } from "../utils/CustomError";

const prisma = new PrismaClient();

export class PurchaseOrderItemController {
  // Create a new PurchaseOrderItem
  async createPurchaseOrderItem(req: Request, res: Response): Promise<void> {
    const { poID, itemID, uom, unitCost, orderQty } = req.body;

    try {
      const newPurchaseOrderItem = await prisma.purchaseOrderItem.create({
        data: {
          poID,
          itemID,
          uom,
          unitCost,
          orderQty,
        },
      });

      res.status(201).json({
        success: true,
        message: "Purchase Order Item created successfully",
        data: newPurchaseOrderItem,
      });
    } catch (error) {
      throw new CustomError("Error creating purchase order item", 500);
    }
  }

  // Get all PurchaseOrderItems
  async getAllPurchaseOrderItems(req: Request, res: Response): Promise<void> {
    try {
      const purchaseOrderItems = await prisma.purchaseOrderItem.findMany();
      res.status(200).json({
        success: true,
        data: purchaseOrderItems,
      });
    } catch (error) {
      throw new CustomError("Error fetching purchase order items", 500);
    }
  }

  // Get PurchaseOrderItem by ID
  async getPurchaseOrderItemById(req: Request, res: Response): Promise<void> {
    const { poItemID } = req.params;

    try {
      const purchaseOrderItem = await prisma.purchaseOrderItem.findUnique({
        where: { poItemID: parseInt(poItemID) },
      });

      if (!purchaseOrderItem) {
        res.status(404).json({
          success: false,
          message: "Purchase Order Item not found",
        });
      } else {
        res.status(200).json({
          success: true,
          data: purchaseOrderItem,
        });
      }
    } catch (error) {
      throw new CustomError("Error fetching purchase order item", 500);
    }
  }

  // Update PurchaseOrderItem
  async updatePurchaseOrderItem(req: Request, res: Response): Promise<void> {
    const { poItemID } = req.params;
    const { poID, itemID, uom, unitCost, orderQty } = req.body;

    try {
      const updatedPurchaseOrderItem = await prisma.purchaseOrderItem.update({
        where: { poItemID: parseInt(poItemID) },
        data: {
          poID,
          itemID,
          uom,
          unitCost,
          orderQty,
        },
      });

      res.status(200).json({
        success: true,
        message: "Purchase Order Item updated successfully",
        data: updatedPurchaseOrderItem,
      });
    } catch (error) {
      throw new CustomError("Error updating purchase order item", 500);
    }
  }

  // Delete PurchaseOrderItem
  async deletePurchaseOrderItem(req: Request, res: Response): Promise<void> {
    const { poItemID } = req.params;

    try {
      await prisma.purchaseOrderItem.delete({
        where: { poItemID: parseInt(poItemID) },
      });

      res.status(200).json({
        success: true,
        message: "Purchase Order Item deleted successfully",
      });
    } catch (error) {
      throw new CustomError("Error deleting purchase order item", 500);
    }
  }
}
