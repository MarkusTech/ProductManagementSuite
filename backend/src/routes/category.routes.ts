import { Router } from "express";
import { CategoryController } from "../controller/categoryController";

const router = Router();
const categoryController = new CategoryController();

// Routes
router.post("/category", categoryController.createCategory);
router.get("/category", categoryController.getAllCategories);
router.get("/category/:id", categoryController.getCategoryById);
router.put("/category/:id", categoryController.updateCategory);
router.delete("/category/:id", categoryController.deleteCategory);

export default router;
