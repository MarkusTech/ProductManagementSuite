import { Router } from "express";
import { PurchaseOrderController } from "../controller/po_purchaseOrderController";
import { verifyToken } from "../middlewares/authMiddlewares";

const router = Router();
const purchaseOrderController = new PurchaseOrderController();

router.post(
  "/purchase-orders",
  verifyToken,
  purchaseOrderController.createPurchaseOrder
);

router.get(
  "/purchase-orders",
  verifyToken,
  purchaseOrderController.getAllPurchaseOrders
);

router.get(
  "/purchase-orders/:poID",
  verifyToken,
  purchaseOrderController.getPurchaseOrderById
);

router.put(
  "/purchase-orders/:poID",
  verifyToken,
  purchaseOrderController.updatePurchaseOrder
);

router.delete(
  "/purchase-orders/:poID",
  verifyToken,
  purchaseOrderController.deletePurchaseOrder
);

export default router;
