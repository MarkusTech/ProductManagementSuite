import { Router } from "express";
import { InventoryController } from "../controller/item_inventoryController";
import { verifyToken } from "../middlewares/authMiddlewares";

const router = Router();
const inventoryController = new InventoryController();

router.post("/inventory", verifyToken, inventoryController.createInventory);
router.get("/inventory", verifyToken, inventoryController.getAllInventory);
router.get(
  "/inventory/:inventoryID",
  verifyToken,
  inventoryController.getInventoryById
);
router.put(
  "/inventory/:inventoryID",
  verifyToken,
  inventoryController.updateInventory
);
router.delete(
  "/inventory/:inventoryID",
  verifyToken,
  inventoryController.deleteInventory
);

export default router;
