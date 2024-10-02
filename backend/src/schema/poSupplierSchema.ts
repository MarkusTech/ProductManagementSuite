import { z } from "zod";

export const poSupplierSchema = z.object({
  supplierID: z.number().int().optional(),
  supplierName: z.string().nonempty(),
  contactDetails: z.string().optional(),
  address: z.string().optional(),
  email: z.string().email().nonempty(),
  createdByID: z.number().int(),
  modifiedByID: z.number().int().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  status: z.boolean().default(true),
});
