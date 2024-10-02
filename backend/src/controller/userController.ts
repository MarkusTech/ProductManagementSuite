import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { CustomError } from "../utils/CustomError";
import logger from "../utils/logger";

const prisma = new PrismaClient();

export class UserController {
  // Create a new user
  async createUser(req: Request, res: Response): Promise<void> {
    const {
      firstName,
      middleName,
      lastName,
      roleID,
      username,
      email,
      password,
      phoneNumber,
      address,
      birthday,
      createdByID,
      modifiedByID,
    } = req.body;

    let image_url: string | null = null;

    if (req.file) {
      image_url = req.file.path; // Save the file path
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.users.create({
        data: {
          firstName,
          middleName,
          lastName,
          roleID: parseInt(roleID, 10),
          username,
          email,
          password: hashedPassword,
          phoneNumber,
          address,
          birthday,
          image_url,
          createdByID: parseInt(createdByID, 10),
          modifiedByID: parseInt(modifiedByID, 10),
        },
      });

      logger.info(`User created: ${newUser.username}`);

      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: newUser,
      });
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Error creating user: ${error.message}`);
        res.status(500).json({
          success: false,
          message: "Error creating user",
        });
      } else {
        logger.error("Unknown error occurred during user creation");
        res.status(500).json({
          success: false,
          message: "Unknown error",
        });
      }
    }
  }

  // Get all users
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await prisma.users.findMany();
      logger.info("Fetched all users");
      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Error fetching users: ${error.message}`);
        throw new CustomError("Error fetching users", 500);
      } else {
        logger.error("Unknown error occurred while fetching users");
        throw new CustomError("Unknown error", 500);
      }
    }
  }

  // Get user by ID
  async getUserById(req: Request, res: Response): Promise<void> {
    const { userID } = req.params;

    try {
      const user = await prisma.users.findUnique({
        where: { userID: parseInt(userID) },
      });

      if (!user) {
        logger.warn(`User with ID ${userID} not found`);
        throw new CustomError("User not found", 404);
      } else {
        logger.info(`Fetched user with ID ${userID}`);
        res.status(200).json({
          success: true,
          data: user,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Error fetching user: ${error.message}`);
        throw new CustomError("Error fetching user", 500);
      } else {
        logger.error("Unknown error occurred while fetching user");
        throw new CustomError("Unknown error", 500);
      }
    }
  }

  // Update user
  async updateUser(req: Request, res: Response): Promise<void> {
    const { userID } = req.params;
    const {
      firstName,
      middleName,
      lastName,
      roleID,
      username,
      email,
      phoneNumber,
      address,
      birthday,
      status,
      image_url,
      modifiedByID,
    } = req.body;

    try {
      const updatedUser = await prisma.users.update({
        where: { userID: parseInt(userID) },
        data: {
          firstName,
          middleName,
          lastName,
          roleID,
          username,
          email,
          phoneNumber,
          address,
          birthday,
          status,
          image_url,
          modifiedByID,
        },
      });

      logger.info(`User with ID ${userID} updated`);

      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: updatedUser,
      });
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Error updating user: ${error.message}`);
        throw new CustomError("Error updating user", 500);
      } else {
        logger.error("Unknown error occurred while updating user");
        throw new CustomError("Unknown error", 500);
      }
    }
  }

  // Delete user
  async deleteUser(req: Request, res: Response): Promise<void> {
    const { userID } = req.params;

    try {
      await prisma.users.delete({
        where: { userID: parseInt(userID) },
      });

      logger.info(`User with ID ${userID} deleted`);

      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Error deleting user: ${error.message}`);
        throw new CustomError("Error deleting user", 500);
      } else {
        logger.error("Unknown error occurred while deleting user");
        throw new CustomError("Unknown error", 500);
      }
    }
  }
}
