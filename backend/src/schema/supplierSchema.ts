import { z } from "zod";

export const SupplierSchema = z.object({
  supplierID: z.number().int().optional(),
  supplierName: z.string().nonempty(),
  description: z.string().optional(),
  status: z.boolean().default(true),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
