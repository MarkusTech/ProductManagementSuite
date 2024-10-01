import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { CustomError } from "../utils/CustomError";

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
      image_url,
      createdByID,
      modifiedByID,
    } = req.body;

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.users.create({
        data: {
          firstName,
          middleName,
          lastName,
          roleID,
          username,
          email,
          password: hashedPassword, // Save hashed password
          phoneNumber,
          address,
          birthday,
          image_url,
          createdByID,
          modifiedByID,
        },
      });

      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: newUser,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new CustomError("Error creating user", 500);
      }
      throw new CustomError("An unexpected error occurred", 500);
    }
  }

  // Get all users
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await prisma.users.findMany();
      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      throw new CustomError("Error fetching users", 500);
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
        throw new CustomError("User not found", 404);
      } else {
        res.status(200).json({
          success: true,
          data: user,
        });
      }
    } catch (error) {
      throw new CustomError("Error fetching user", 500);
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

      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: updatedUser,
      });
    } catch (error) {
      throw new CustomError("Error updating user", 500);
    }
  }

  // Delete user
  async deleteUser(req: Request, res: Response): Promise<void> {
    const { userID } = req.params;

    try {
      await prisma.users.delete({
        where: { userID: parseInt(userID) },
      });

      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      throw new CustomError("Error deleting user", 500);
    }
  }
}
