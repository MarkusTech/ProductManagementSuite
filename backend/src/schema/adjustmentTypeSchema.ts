import { z } from "zod";

export const AdjustmentTypeSchema = z.object({
  adjustmentTypeID: z.number().int().optional(),
  typeName: z.string().nonempty(),
  createdByID: z.number().int(),
  modifiedByID: z.number().int().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
