import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export class AuthController {
  // Login method
  async login(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;

    try {
      // Find the user by username
      const user = await prisma.users.findUnique({
        where: { username },
      });

      if (!user) {
        res.status(400).json({ error: "User not found" });
        return;
      }

      // Check if the password is correct
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        res.status(400).json({ error: "Invalid password" });
        return;
      }

      // Generate a JWT token
      const token = jwt.sign(
        { userID: user.userID, username: user.username, roleID: user.roleID },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );

      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  }

  // Logout method (stateless approach)
  logout(req: Request, res: Response): void {
    // For a stateless JWT approach, just send a response indicating logout
    res.status(200).json({ message: "Logged out successfully" });
  }
}
