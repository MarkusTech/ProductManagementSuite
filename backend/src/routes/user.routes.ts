import { Router } from "express";
import { UserController } from "../controller/userController";
import { verifyToken } from "../middlewares/authMiddlewares";

const router = Router();
const userController = new UserController();

router.post("/users", userController.createUser);

router.get("/users", verifyToken, userController.getAllUsers);
router.get("/users/:userID", verifyToken, userController.getUserById);
router.put("/users/:userID", verifyToken, userController.updateUser);
router.delete("/users/:userID", verifyToken, userController.deleteUser);

export default router;
