import { Router } from "express";
import { CategoryController } from "../controller/categoryController";
import { verifyToken } from "../middlewares/authMiddlewares";

const router = Router();
const categoryController = new CategoryController();

router.post("/categories", verifyToken, categoryController.createCategory);
router.get("/categories", verifyToken, categoryController.getAllCategories);
router.get(
  "/categories/:categoryID",
  verifyToken,
  categoryController.getCategoryById
);
router.put(
  "/categories/:categoryID",
  verifyToken,
  categoryController.updateCategory
);
router.delete(
  "/categories/:categoryID",
  verifyToken,
  categoryController.deleteCategory
);

export default router;
