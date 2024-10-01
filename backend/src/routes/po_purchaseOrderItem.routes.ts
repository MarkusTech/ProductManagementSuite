import { Router } from "express";
import { PurchaseOrderItemController } from "../controller/po_purchaseOrderItemController";
import { verifyToken } from "../middlewares/authMiddlewares";

const router = Router();
const purchaseOrderItemController = new PurchaseOrderItemController();

router.post(
  "/purchase-order-items",
  verifyToken,
  purchaseOrderItemController.createPurchaseOrderItem
);
router.get(
  "/purchase-order-items",
  verifyToken,
  purchaseOrderItemController.getAllPurchaseOrderItems
);
router.get(
  "/purchase-order-items/:poItemID",
  verifyToken,
  purchaseOrderItemController.getPurchaseOrderItemById
);
router.put(
  "/purchase-order-items/:poItemID",
  verifyToken,
  purchaseOrderItemController.updatePurchaseOrderItem
);
router.delete(
  "/purchase-order-items/:poItemID",
  verifyToken,
  purchaseOrderItemController.deletePurchaseOrderItem
);

export default router;
