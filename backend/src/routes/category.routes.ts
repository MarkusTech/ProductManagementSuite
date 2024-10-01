import { Router } from "express";
import { CategoryController } from "../controller/categoryController";
import { verifyToken } from "../middlewares/authMiddlewares";

const router = Router();
const categoryController = new CategoryController();

router.post("/categories", verifyToken, categoryController.createCategory); // Protected route
router.get("/categories", verifyToken, categoryController.getAllCategories); // Protected route
router.get(
  "/categories/:categoryID",
  verifyToken,
  categoryController.getCategoryById
); // Protected route
router.put(
  "/categories/:categoryID",
  verifyToken,
  categoryController.updateCategory
); // Protected route
router.delete(
  "/categories/:categoryID",
  verifyToken,
  categoryController.deleteCategory
); // Protected route

export default router;
