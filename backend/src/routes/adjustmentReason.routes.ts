import { Router } from "express";
import { AdjustmentReasonController } from "../controller/adjustmentReasonController";
import { verifyToken } from "../middlewares/authMiddlewares";

const router = Router();
const adjustmentReasonController = new AdjustmentReasonController();

router.post(
  "/adjustment-reason",
  verifyToken,
  adjustmentReasonController.createAdjustmentReason
); // Create a new AdjustmentReason
router.get(
  "/adjustment-reason",
  verifyToken,
  adjustmentReasonController.getAllAdjustmentReasons
); // Get all AdjustmentReasons
router.get(
  "/adjustment-reason/:adjustmentReasonID",
  verifyToken,
  adjustmentReasonController.getAdjustmentReasonById
); // Get AdjustmentReason by ID
router.put(
  "/adjustment-reason/:adjustmentReasonID",
  verifyToken,
  adjustmentReasonController.updateAdjustmentReason
); // Update AdjustmentReason
router.delete(
  "/adjustment-reason/:adjustmentReasonID",
  verifyToken,
  adjustmentReasonController.deleteAdjustmentReason
); // Delete AdjustmentReason

export default router;
