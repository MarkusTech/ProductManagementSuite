import express, { Request, Response } from "express";
import {
  createCategory,
  categories,
  category,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", protect, (req: Request, res: Response) =>
  createCategory(req, res)
);
router.get("/categories", protect, (req: Request, res: Response) =>
  categories(req, res)
);
router.get("/:slug", protect, (req: Request, res: Response) =>
  category(req, res)
);
router.patch("/:id", protect, (req: Request, res: Response) =>
  updateCategory(req, res)
);
router.delete("/:slug", protect, (req: Request, res: Response) =>
  deleteCategory(req, res)
);

export default router;
