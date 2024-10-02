import { z } from "zod";

export const CategorySchema = z.object({
  categoryID: z.number().int().optional(),
  categoryCode: z.string().nonempty(),
  categoryName: z.string().nonempty(),
  description: z.string().optional(),
  status: z.boolean().default(true),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
