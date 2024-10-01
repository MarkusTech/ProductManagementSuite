import { Router } from "express";
import { InventoryAdjustmentController } from "../controller/item_inventoryAdjustmentController";
import { verifyToken } from "../middlewares/authMiddlewares";

const router = Router();
const inventoryAdjustmentController = new InventoryAdjustmentController();

router.post(
  "/inventory-adjustment",
  verifyToken,
  inventoryAdjustmentController.createInventoryAdjustment
);
router.get(
  "/inventory-adjustment",
  verifyToken,
  inventoryAdjustmentController.getAllInventoryAdjustments
);
router.get(
  "/inventory-adjustment/:adjustmentID",
  verifyToken,
  inventoryAdjustmentController.getInventoryAdjustmentById
);
router.put(
  "/inventory-adjustment/:adjustmentID",
  verifyToken,
  inventoryAdjustmentController.updateInventoryAdjustment
);
router.delete(
  "/inventory-adjustment/:adjustmentID",
  verifyToken,
  inventoryAdjustmentController.deleteInventoryAdjustment
);

export default router;
