import { z } from "zod";

export const ItemSchema = z.object({
  itemID: z.number().int().optional(),
  itemCode: z.string().nonempty(),
  categoryID: z.number().int(),
  barcode: z.string().optional(),
  itemName: z.string().nonempty(),
  description: z.string().optional(),
  grams: z.number().positive(),
  uom: z.string().nonempty(),
  price: z.number().positive(),
  cost: z.number().positive(),
  image_url: z.string().optional(),
  createdByID: z.number().int(),
  modifiedByID: z.number().int().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  status: z.boolean().default(true),
});
