import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CustomError } from "../utils/CustomError";

const prisma = new PrismaClient();

export class LocationController {
  // Create a new location
  async createLocation(req: Request, res: Response): Promise<void> {
    const { locationName, description, status, createdByID, modifiedByID } =
      req.body;

    try {
      const newLocation = await prisma.location.create({
        data: {
          locationName,
          description,
          status,
          createdByID,
          modifiedByID,
        },
      });

      res.status(201).json({
        success: true,
        message: "Location created successfully",
        data: newLocation,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new CustomError("Error creating location", 500);
      }
      throw new CustomError("An unexpected error occurred", 500);
    }
  }

  // Get all locations
  async getAllLocations(req: Request, res: Response): Promise<void> {
    try {
      const locations = await prisma.location.findMany();
      res.status(200).json({
        success: true,
        data: locations,
      });
    } catch (error) {
      console.error(error);
      throw new CustomError("Error fetching locations", 500);
    }
  }

  // Get location by ID
  async getLocationById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const location = await prisma.location.findUnique({
        where: { locationID: parseInt(id) },
      });

      if (!location) {
        throw new CustomError("Location not found", 404);
      } else {
        res.status(200).json({
          success: true,
          data: location,
        });
      }
    } catch (error) {
      console.error(error);
      throw new CustomError("Error fetching location", 500);
    }
  }

  // Update location
  async updateLocation(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { locationName, description, status, modifiedByID } = req.body;

    try {
      const updatedLocation = await prisma.location.update({
        where: { locationID: parseInt(id) },
        data: {
          locationName,
          description,
          status,
          modifiedByID,
        },
      });

      res.status(200).json({
        success: true,
        message: "Location updated successfully",
        data: updatedLocation,
      });
    } catch (error) {
      console.error(error);
      throw new CustomError("Error updating location", 500);
    }
  }

  // Delete location
  async deleteLocation(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      await prisma.location.delete({
        where: { locationID: parseInt(id) },
      });

      res.status(200).json({
        success: true,
        message: "Location deleted successfully",
      });
    } catch (error) {
      console.error(error);
      throw new CustomError("Error deleting location", 500);
    }
  }
}
