import { Router } from "express";
import { InventoryAdjustmentController } from "../controller/inventoryAdjustmentController";
import { verifyToken } from "../middlewares/authMiddlewares";

const router = Router();
const inventoryAdjustmentController = new InventoryAdjustmentController();

router.post(
  "/inventory-adjustment",
  verifyToken,
  inventoryAdjustmentController.createInventoryAdjustment
); // Create a new InventoryAdjustment
router.get(
  "/inventory-adjustment",
  verifyToken,
  inventoryAdjustmentController.getAllInventoryAdjustments
); // Get all InventoryAdjustments
router.get(
  "/inventory-adjustment/:adjustmentID",
  verifyToken,
  inventoryAdjustmentController.getInventoryAdjustmentById
); // Get InventoryAdjustment by ID
router.put(
  "/inventory-adjustment/:adjustmentID",
  verifyToken,
  inventoryAdjustmentController.updateInventoryAdjustment
); // Update InventoryAdjustment
router.delete(
  "/inventory-adjustment/:adjustmentID",
  verifyToken,
  inventoryAdjustmentController.deleteInventoryAdjustment
); // Delete InventoryAdjustment

export default router;
