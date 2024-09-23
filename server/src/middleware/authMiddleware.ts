import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";

interface DecodedToken {
  _id: string;
}

const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json("You're not authorized");
    }

    const verified = jwt.verify(token, process.env.SECRET_KEY!) as DecodedToken;

    const user = await User.findById(verified._id).select("-password");

    if (!user) {
      return res.status(401).json("You're not authorized");
    }
    req.user = user; // No error here
    next();
  } catch (error) {
    return res.status(401).json("You're not authorized");
  }
};

const authGuard = async (req: Request, res: Response, next: NextFunction) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(
        token,
        process.env.SECRET_KEY!
      ) as DecodedToken;
      const user = await User.findById(decoded._id);
      if (!user) {
        return res.status(401).json("User not found");
      }
      req.user = user; // No error here
      next();
    } catch (error) {
      return res.status(401).json("Token invalid");
    }
  } else {
    return res.status(401).json("No token provided");
  }
};

const adminGuard = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.admin) {
    next();
  } else {
    const error = new Error("Not authorized as an admin");
    error.name = "UnauthorizedError";
    return next(error);
  }
};

export { protect, authGuard, adminGuard };
