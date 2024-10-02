import { z } from "zod";

export const poReceivingItemSchema = z.object({
  poReceivingItemID: z.number().int().optional(),
  itemID: z.number().int(),
  uom: z.string().nonempty(),
  receivedQty: z.number().int().positive(),
  unitCost: z.number().positive(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
