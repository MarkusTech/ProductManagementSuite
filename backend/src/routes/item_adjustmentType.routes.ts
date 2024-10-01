import { Router } from "express";
import { AdjustmentTypeController } from "../controller/item_adjustmentTypeController";
import { verifyToken } from "../middlewares/authMiddlewares";

const router = Router();
const adjustmentTypeController = new AdjustmentTypeController();

router.post(
  "/adjustment-type",
  verifyToken,
  adjustmentTypeController.createAdjustmentType
);
router.get(
  "/adjustment-type",
  verifyToken,
  adjustmentTypeController.getAllAdjustmentTypes
);
router.get(
  "/adjustment-type/:adjustmentTypeID",
  verifyToken,
  adjustmentTypeController.getAdjustmentTypeById
);
router.put(
  "/adjustment-type/:adjustmentTypeID",
  verifyToken,
  adjustmentTypeController.updateAdjustmentType
);
router.delete(
  "/adjustment-type/:adjustmentTypeID",
  verifyToken,
  adjustmentTypeController.deleteAdjustmentType
);

export default router;
