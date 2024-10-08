import { Router } from "express";
import { ItemController } from "../controller/item_itemController";
import { verifyToken } from "../middlewares/authMiddlewares";
import upload from "../config/multerConfig";

const router = Router();
const itemController = new ItemController();

router.post("/items", verifyToken, upload, itemController.createItem);
router.get("/items", verifyToken, itemController.getAllItems);
router.get("/items/:itemID", verifyToken, itemController.getItemById);
router.put("/items/:itemID", verifyToken, itemController.updateItem);
router.delete("/items/:itemID", verifyToken, itemController.deleteItem);

export default router;
