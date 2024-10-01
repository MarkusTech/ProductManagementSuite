import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CustomError } from "../utils/CustomError"; // Custom error handling

const prisma = new PrismaClient();

export class PoSupplierController {
  // Create a new Supplier
  async createSupplier(req: Request, res: Response): Promise<void> {
    const {
      supplierName,
      contactDetails,
      address,
      email,
      createdByID,
      modifiedByID,
    } = req.body;

    try {
      const newSupplier = await prisma.poSupplier.create({
        data: {
          supplierName,
          contactDetails,
          address,
          email,
          createdByID,
          modifiedByID,
        },
      });

      res.status(201).json({
        success: true,
        message: "Supplier created successfully",
        data: newSupplier,
      });
    } catch (error) {
      throw new CustomError("Error creating supplier", 500);
    }
  }

  // Get all Suppliers
  async getAllSuppliers(req: Request, res: Response): Promise<void> {
    try {
      const suppliers = await prisma.poSupplier.findMany();
      res.status(200).json({
        success: true,
        data: suppliers,
      });
    } catch (error) {
      throw new CustomError("Error fetching suppliers", 500);
    }
  }

  // Get Supplier by ID
  async getSupplierById(req: Request, res: Response): Promise<void> {
    const { supplierID } = req.params;

    try {
      const supplier = await prisma.poSupplier.findUnique({
        where: { supplierID: parseInt(supplierID) },
      });

      if (!supplier) {
        res.status(404).json({
          success: false,
          message: "Supplier not found",
        });
      } else {
        res.status(200).json({
          success: true,
          data: supplier,
        });
      }
    } catch (error) {
      throw new CustomError("Error fetching supplier", 500);
    }
  }

  // Update Supplier
  async updateSupplier(req: Request, res: Response): Promise<void> {
    const { supplierID } = req.params;
    const { supplierName, contactDetails, address, email, modifiedByID } =
      req.body;

    try {
      const updatedSupplier = await prisma.poSupplier.update({
        where: { supplierID: parseInt(supplierID) },
        data: {
          supplierName,
          contactDetails,
          address,
          email,
          modifiedByID,
        },
      });

      res.status(200).json({
        success: true,
        message: "Supplier updated successfully",
        data: updatedSupplier,
      });
    } catch (error) {
      throw new CustomError("Error updating supplier", 500);
    }
  }

  // Delete Supplier
  async deleteSupplier(req: Request, res: Response): Promise<void> {
    const { supplierID } = req.params;

    try {
      await prisma.poSupplier.delete({
        where: { supplierID: parseInt(supplierID) },
      });

      res.status(200).json({
        success: true,
        message: "Supplier deleted successfully",
      });
    } catch (error) {
      throw new CustomError("Error deleting supplier", 500);
    }
  }
}
