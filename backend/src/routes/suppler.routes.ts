import { Router } from "express";
import { SupplierController } from "../controller/supplierController";

const router = Router();
const supplierController = new SupplierController();

// Define routes for suppliers
router.post("/", supplierController.createSupplier.bind(supplierController));
router.get("/", supplierController.getAllSuppliers.bind(supplierController));
router.get("/:id", supplierController.getSupplierById.bind(supplierController));
router.put("/:id", supplierController.updateSupplier.bind(supplierController));
router.delete(
  "/:id",
  supplierController.deleteSupplier.bind(supplierController)
);

export default router;
