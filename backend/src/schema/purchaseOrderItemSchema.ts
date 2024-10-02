import { z } from "zod";

export const PurchaseOrderItemSchema = z.object({
  poItemID: z.number().int().optional(),
  poID: z.number().int(),
  itemID: z.number().int(),
  uom: z.string().nonempty(),
  unitCost: z.number().positive(),
  orderQty: z.number().int().positive(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
