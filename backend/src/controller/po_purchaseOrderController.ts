import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CustomError } from "../utils/CustomError"; // Assuming you have a CustomError utility class

const prisma = new PrismaClient();

export class PurchaseOrderController {
  // Create a new PurchaseOrder
  async createPurchaseOrder(req: Request, res: Response): Promise<void> {
    const { poNumber, supplierID, orderDate, expectedDeliverDate, status, locationID, createdByID, modifiedByID } = req.body;

    try {
      const newPurchaseOrder = await prisma.purchaseOrder.create({
        data: {
          poNumber,
          supplierID,
          orderDate,
          expectedDeliverDate,
          status,
          locationID,
          createdByID,
          modifiedByID,
        },
      });

      res.status(201).json({
        success: true,
        message: "Purchase Order created successfully",
        data: newPurchaseOrder,
      });
    } catch (error) {
      throw new CustomError("Error creating purchase order", 500);
    }
  }

  // Get all PurchaseOrders
  async getAllPurchaseOrders(req: Request, res: Response): Promise<void> {
    try {
      const purchaseOrders = await prisma.purchaseOrder.findMany();
      res.status(200).json({
        success: true,
        data: purchaseOrders,
      });
    } catch (error) {
      throw new CustomError("Error fetching purchase orders", 500);
    }
  }

  // Get PurchaseOrder by ID
  async getPurchaseOrderById(req: Request, res: Response): Promise<void> {
    const { poID } = req.params;

    try {
      const purchaseOrder = await prisma.purchaseOrder.findUnique({
        where: { poID: parseInt(poID) },
      });

      if (!purchaseOrder) {
        res.status(404).json({
          success: false,
          message: "Purchase Order not found",
        });
      } else {
        res.status(200).json({
          success: true,
          data: purchaseOrder,
        });
      }
    } catch (error) {
      throw new CustomError("Error fetching purchase order", 500);
    }
  }

  // Update PurchaseOrder
  async updatePurchaseOrder(req: Request, res: Response): Promise<void> {
    const { poID } = req.params;
    const { poNumber, supplierID, orderDate, expectedDeliverDate, status, locationID, modifiedByID } = req.body;

    try {
      const updatedPurchaseOrder = await prisma.purchaseOrder.update({
        where: { poID: parseInt(poID) },
        data: {
          poNumber,
          supplierID,
          orderDate,
          expectedDeliverDate,
          status,
          locationID,
          modifiedByID,
        },
      });

      res.status(200).json({
        success: true,
        message: "Purchase Order updated successfully",
        data: updatedPurchaseOrder,
      });
    } catch (error) {
      throw new CustomError("Error updating purchase order", 500);
    }
  }

  // Delete PurchaseOrder
  async deletePurchaseOrder(req: Request, res: Response): Promise<void> {
    const { poID } = req.params;

    try {
      await prisma.purchaseOrder.delete({
        where: { poID: parseInt(poID) },
      });

      res.status(200).json({
        success: true,
        message: "Purchase Order deleted successfully",
      });
    } catch (error) {
      throw new CustomError("Error deleting purchase order", 500);
    }
  }
}
