import { Router } from "express";
import { InventoryTypeController } from "../controller/item_inventoryTypeController";
import { verifyToken } from "../middlewares/authMiddlewares";

const router = Router();
const inventoryTypeController = new InventoryTypeController();

router.post(
  "/inventory-type",
  verifyToken,
  inventoryTypeController.createInventoryType
);
router.get(
  "/inventory-type",
  verifyToken,
  inventoryTypeController.getAllInventoryTypes
);
router.get(
  "/inventory-type/:inventoryTypeID",
  verifyToken,
  inventoryTypeController.getInventoryTypeById
);
router.put(
  "/inventory-type/:inventoryTypeID",
  verifyToken,
  inventoryTypeController.updateInventoryType
);
router.delete(
  "/inventory-type/:inventoryTypeID",
  verifyToken,
  inventoryTypeController.deleteInventoryType
);

export default router;
