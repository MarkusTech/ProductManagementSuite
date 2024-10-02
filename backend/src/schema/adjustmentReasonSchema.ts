import { z } from "zod";

export const AdjustmentReasonSchema = z.object({
  adjustmentReasonID: z.number().int().optional(),
  reasonName: z.string().nonempty(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  createdByID: z.number().int(),
  modifiedByID: z.number().int().optional(),
});
