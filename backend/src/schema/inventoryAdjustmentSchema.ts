import { z } from "zod";

export const InventoryAdjustmentSchema = z.object({
  adjustmentID: z.number().int().optional(),
  inventoryID: z.number().int(),
  adjustmentTypeID: z.number().int(),
  adjustmentReasonID: z.number().int(),
  quantityAdjusted: z.number().int(),
  status: z.string().nonempty(),
  createdByID: z.number().int(),
  modifiedByID: z.number().int().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
