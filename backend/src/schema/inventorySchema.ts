import { z } from "zod";

export const InventorySchema = z.object({
  inventoryID: z.number().int().optional(),
  locationID: z.number().int(),
  itemID: z.number().int(),
  quantity: z.number().int(),
  inventoryTypeID: z.number().int(),
  reOrderThreshold: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
