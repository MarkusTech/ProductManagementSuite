import { Router } from "express";
import { UserController } from "../controller/userController";
import { verifyToken } from "../middlewares/authMiddlewares";

const router = Router();
const userController = new UserController();

router.post("/users", userController.createUser);

router.get("/users", verifyToken, userController.getAllUsers); // Get all users
router.get("/users/:userID", verifyToken, userController.getUserById); // Get a user by ID
router.put("/users/:userID", verifyToken, userController.updateUser); // Update user details
router.delete("/users/:userID", verifyToken, userController.deleteUser); // Delete a user

export default router;
