import { z } from "zod";

export const UserSchema = z.object({
  userID: z.number().int().optional(),
  firstName: z.string().nonempty(),
  middleName: z.string().optional(),
  lastName: z.string().nonempty(),
  roleID: z.number().int(),
  username: z.string().nonempty(),
  email: z.string().email().nonempty(),
  password: z.string().nonempty(),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  birthday: z.string().optional(),
  status: z.boolean().default(true),
  image_url: z.string().optional(),
  createdByID: z.number().int(),
  modifiedByID: z.number().int().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
