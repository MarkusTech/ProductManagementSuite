import { Router } from "express";
import { AdjustmentTypeController } from "../controller/adjustmentTypeController";
import { verifyToken } from "../middlewares/authMiddlewares";

const router = Router();
const adjustmentTypeController = new AdjustmentTypeController();

router.post(
  "/adjustment-type",
  verifyToken,
  adjustmentTypeController.createAdjustmentType
); // Create a new AdjustmentType
router.get(
  "/adjustment-type",
  verifyToken,
  adjustmentTypeController.getAllAdjustmentTypes
); // Get all AdjustmentTypes
router.get(
  "/adjustment-type/:adjustmentTypeID",
  verifyToken,
  adjustmentTypeController.getAdjustmentTypeById
); // Get AdjustmentType by ID
router.put(
  "/adjustment-type/:adjustmentTypeID",
  verifyToken,
  adjustmentTypeController.updateAdjustmentType
); // Update AdjustmentType
router.delete(
  "/adjustment-type/:adjustmentTypeID",
  verifyToken,
  adjustmentTypeController.deleteAdjustmentType
); // Delete AdjustmentType

export default router;
