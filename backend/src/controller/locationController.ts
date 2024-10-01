import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CustomError } from "../utils/CustomError";

const prisma = new PrismaClient();

export class LocationController {
  // Create a new location
  async createLocation(req: Request, res: Response): Promise<void> {
    const { locationName, description, createdByID, modifiedByID } = req.body;

    try {
      const newLocation = await prisma.locations.create({
        data: {
          locationName,
          description,
          createdByID,
          modifiedByID,
        },
      });

      res.status(201).json({
        success: true,
        message: "Location created successfully",
        data: newLocation,
      });
    } catch (error) {
      throw new CustomError("Error creating location", 500);
    }
  }

  // Get all locations
  async getAllLocations(req: Request, res: Response): Promise<void> {
    try {
      const locations = await prisma.locations.findMany();
      res.status(200).json({
        success: true,
        data: locations,
      });
    } catch (error) {
      throw new CustomError("Error fetching locations", 500);
    }
  }

  // Get location by ID
  async getLocationById(req: Request, res: Response): Promise<void> {
    const { locationID } = req.params;

    try {
      const location = await prisma.locations.findUnique({
        where: { locationID: parseInt(locationID) },
      });

      if (!location) {
        res.status(404).json({
          success: false,
          message: "Location not found",
        });
      } else {
        res.status(200).json({
          success: true,
          data: location,
        });
      }
    } catch (error) {
      throw new CustomError("Error fetching location", 500);
    }
  }

  // Update location
  async updateLocation(req: Request, res: Response): Promise<void> {
    const { locationID } = req.params;
    const { locationName, description, modifiedByID, status } = req.body;

    try {
      const updatedLocation = await prisma.locations.update({
        where: { locationID: parseInt(locationID) },
        data: {
          locationName,
          description,
          modifiedByID,
          status,
        },
      });

      res.status(200).json({
        success: true,
        message: "Location updated successfully",
        data: updatedLocation,
      });
    } catch (error) {
      throw new CustomError("Error updating location", 500);
    }
  }

  // Delete location
  async deleteLocation(req: Request, res: Response): Promise<void> {
    const { locationID } = req.params;

    try {
      await prisma.locations.delete({
        where: { locationID: parseInt(locationID) },
      });

      res.status(200).json({
        success: true,
        message: "Location deleted successfully",
      });
    } catch (error) {
      throw new CustomError("Error deleting location", 500);
    }
  }
}
