import { Router } from "express";
import { ItemController } from "../controller/itemController";
import { verifyToken } from "../middlewares/authMiddlewares";

const router = Router();
const itemController = new ItemController();

router.post("/items", verifyToken, itemController.createItem); // Create new item
router.get("/items", verifyToken, itemController.getAllItems); // Get all items
router.get("/items/:itemID", verifyToken, itemController.getItemById); // Get item by ID
router.put("/items/:itemID", verifyToken, itemController.updateItem); // Update item
router.delete("/items/:itemID", verifyToken, itemController.deleteItem); // Delete item

export default router;
