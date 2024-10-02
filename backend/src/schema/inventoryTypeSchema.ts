import { z } from "zod";

export const InventoryTypeSchema = z.object({
  inventoryTypeID: z.number().int().optional(),
  typeName: z.string().nonempty(),
  description: z.string().nonempty(),
  status: z.boolean().default(true),
  createdByID: z.number().int(),
  modifiedByID: z.number().int().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
