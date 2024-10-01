import { Router } from "express";
import { LocationController } from "../controller/locationController";
import { verifyToken } from "../middlewares/authMiddlewares";

const router = Router();
const locationController = new LocationController();

router.post("/locations", verifyToken, locationController.createLocation);
router.get("/locations", verifyToken, locationController.getAllLocations);
router.get(
  "/locations/:locationID",
  verifyToken,
  locationController.getLocationById
);
router.put(
  "/locations/:locationID",
  verifyToken,
  locationController.updateLocation
);
router.delete(
  "/locations/:locationID",
  verifyToken,
  locationController.deleteLocation
);

export default router;
