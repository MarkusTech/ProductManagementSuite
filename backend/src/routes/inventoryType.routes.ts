import { Router } from "express";
import { InventoryTypeController } from "../controller/inventoryTypeController";
import { verifyToken } from "../middlewares/authMiddlewares";

const router = Router();
const inventoryTypeController = new InventoryTypeController();

router.post(
  "/inventory-type",
  verifyToken,
  inventoryTypeController.createInventoryType
); // Create a new InventoryType
router.get(
  "/inventory-type",
  verifyToken,
  inventoryTypeController.getAllInventoryTypes
); // Get all InventoryTypes
router.get(
  "/inventory-type/:inventoryTypeID",
  verifyToken,
  inventoryTypeController.getInventoryTypeById
); // Get InventoryType by ID
router.put(
  "/inventory-type/:inventoryTypeID",
  verifyToken,
  inventoryTypeController.updateInventoryType
); // Update InventoryType
router.delete(
  "/inventory-type/:inventoryTypeID",
  verifyToken,
  inventoryTypeController.deleteInventoryType
); // Delete InventoryType

export default router;
