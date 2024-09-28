import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CustomError } from "../utils/CustomError";

const prisma = new PrismaClient();

export class SupplierController {
  // Create a new supplier
  async createSupplier(req: Request, res: Response): Promise<void> {
    const { supplierName, description, status, createdByID, modifiedByID } =
      req.body;

    try {
      const newSupplier = await prisma.supplier.create({
        data: {
          supplierName,
          description,
          status,
          createdByID,
          modifiedByID,
        },
      });

      res.status(201).json({
        success: true,
        message: "Supplier created successfully",
        data: newSupplier,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new CustomError("Error creating supplier", 500);
      }
      throw new CustomError("An unexpected error occurred", 500);
    }
  }

  // Get all suppliers
  async getAllSuppliers(req: Request, res: Response): Promise<void> {
    try {
      const suppliers = await prisma.supplier.findMany();
      res.status(200).json({
        success: true,
        data: suppliers,
      });
    } catch (error) {
      console.error(error);
      throw new CustomError("Error fetching suppliers", 500);
    }
  }

  // Get supplier by ID
  async getSupplierById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const supplier = await prisma.supplier.findUnique({
        where: { supplierID: parseInt(id) },
      });

      if (!supplier) {
        throw new CustomError("Supplier not found", 404);
      } else {
        res.status(200).json({
          success: true,
          data: supplier,
        });
      }
    } catch (error) {
      console.error(error);
      throw new CustomError("Error fetching supplier", 500);
    }
  }

  // Update supplier
  async updateSupplier(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { supplierName, description, status, modifiedByID } = req.body;

    try {
      const updatedSupplier = await prisma.supplier.update({
        where: { supplierID: parseInt(id) },
        data: {
          supplierName,
          description,
          status,
          modifiedByID,
        },
      });

      res.status(200).json({
        success: true,
        message: "Supplier updated successfully",
        data: updatedSupplier,
      });
    } catch (error) {
      console.error(error);
      throw new CustomError("Error updating supplier", 500);
    }
  }

  // Delete supplier
  async deleteSupplier(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      await prisma.supplier.delete({
        where: { supplierID: parseInt(id) },
      });

      res.status(200).json({
        success: true,
        message: "Supplier deleted successfully",
      });
    } catch (error) {
      console.error(error);
      throw new CustomError("Error deleting supplier", 500);
    }
  }
}
