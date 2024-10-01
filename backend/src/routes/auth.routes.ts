import { Router } from "express";
import { AuthController } from "../controller/authController";
import { verifyToken } from "../middlewares/authMiddlewares";

const router = Router();
const authController = new AuthController();

router.post("/login", authController.login.bind(authController)); // Public route for login
router.post("/logout", verifyToken, authController.logout.bind(authController)); // Protected route for logout

export default router;
