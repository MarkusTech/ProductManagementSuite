import { Router } from "express";
import { LocationController } from "../controller/locationController";

const router = Router();
const locationController = new LocationController();

// Define routes for locations
router.post("/", locationController.createLocation.bind(locationController));
router.get("/", locationController.getAllLocations.bind(locationController));
router.get("/:id", locationController.getLocationById.bind(locationController));
router.put("/:id", locationController.updateLocation.bind(locationController));
router.delete(
  "/:id",
  locationController.deleteLocation.bind(locationController)
);

export default router;
