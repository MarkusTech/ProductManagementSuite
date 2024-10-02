import { z } from "zod";

export const PurchaseOrderSchema = z.object({
  poID: z.number().int().optional(),
  poNumber: z.number().int().positive(),
  supplierID: z.number().int(),
  orderDate: z.date(),
  expectedDeliverDate: z.date(),
  status: z.string().nonempty(),
  locationID: z.number().int(),
  createdByID: z.number().int(),
  modifiedByID: z.number().int().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
