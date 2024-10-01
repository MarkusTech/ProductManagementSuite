import { Router } from "express";
import { PoSupplierController } from "../controller/po_supplierController";
import { verifyToken } from "../middlewares/authMiddlewares";

const router = Router();
const poSupplierController = new PoSupplierController();

// Routes
router.post("/suppliers", verifyToken, poSupplierController.createSupplier);
router.get("/suppliers", verifyToken, poSupplierController.getAllSuppliers);
router.get(
  "/suppliers/:supplierID",
  verifyToken,
  poSupplierController.getSupplierById
);
router.put(
  "/suppliers/:supplierID",
  verifyToken,
  poSupplierController.updateSupplier
);
router.delete(
  "/suppliers/:supplierID",
  verifyToken,
  poSupplierController.deleteSupplier
);

export default router;
