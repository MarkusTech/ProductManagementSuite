import { z } from "zod";

export const poReceivingSchema = z.object({
  poReceivingID: z.number().int().optional(),
  poID: z.number().int(),
  receivedDate: z.date(),
  referenceNumber: z.string().nonempty(),
  totalCost: z.number().positive(),
  totalQty: z.number().int().positive(),
  status: z.string().nonempty(),
  receivedByID: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
