import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import logger from "../utils/logger";

const prisma = new PrismaClient();

export class AuthController {
  // Login method
  async login(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;

    try {
      const user = await prisma.users.findUnique({
        where: { username },
      });

      if (!user) {
        logger.warn(
          `Login attempt failed: User not found for username ${username}`
        );
        res.status(400).json({ error: "User not found" });
        return;
      }

      // Check if the password is correct
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        logger.warn(
          `Login attempt failed: Invalid password for username ${username}`
        );
        res.status(400).json({ error: "Invalid password" });
        return;
      }

      // Generate a JWT token
      const token = jwt.sign(
        { userID: user.userID, username: user.username, roleID: user.roleID },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );

      logger.info(`User ${username} logged in successfully`);

      res.status(200).json({ token });
    } catch (error) {
      logger.error(
        `Login error for username ${username}: ${(error as Error).message}`
      );
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Login failed" });
      }
    }
  }

  // Logout method
  logout(req: Request, res: Response): void {
    logger.info("User logged out successfully");
    res.status(200).json({ message: "Logged out successfully" });
  }
}
