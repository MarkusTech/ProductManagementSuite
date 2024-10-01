import { Router } from "express";
import { SupplierController } from "../controller/supplierController";
import { verifyToken } from "../middlewares/authMiddlewares";
const router = Router();
const supplierController = new SupplierController();

router.post("/suppliers", verifyToken, supplierController.createSupplier);
router.get("/suppliers", verifyToken, supplierController.getAllSuppliers);
router.get(
  "/suppliers/:supplierID",
  verifyToken,
  supplierController.getSupplierById
);
router.put(
  "/suppliers/:supplierID",
  verifyToken,
  supplierController.updateSupplier
);
router.delete(
  "/suppliers/:supplierID",
  verifyToken,
  supplierController.deleteSupplier
);

export default router;
