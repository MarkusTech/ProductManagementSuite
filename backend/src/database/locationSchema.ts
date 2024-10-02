import { z } from "zod";

export const LocationSchema = z.object({
  locationID: z.number().int().optional(),
  locationName: z.string().nonempty(),
  description: z.string().optional(),
  status: z.boolean().default(true),
  createdByID: z.number().int(),
  modifiedByID: z.number().int().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
