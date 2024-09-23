import express from "express";
import {
  register,
  login,
  logout,
  user,
  loggedIn,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
} from "../controllers/userController";
import { protect, authGuard } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/profile", authGuard, user);
router.get("/loggedin", loggedIn);
router.patch("/update-profile", protect, updateProfile);
router.patch("/change-password", protect, changePassword);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:resetToken", resetPassword);

export default router;
