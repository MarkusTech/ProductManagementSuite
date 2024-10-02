import { z } from "zod";

export const CreateUserSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  roleID: z.number().int().positive(),
  username: z
    .string()
    .min(1, "Username is required")
    .max(20, "Username must be at most 20 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  birthday: z.string().optional(), // You can use z.date() if you want to validate dates
  createdByID: z.number().int().positive(),
  modifiedByID: z.number().int().optional(),
});

export const UpdateUserSchema = z.object({
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
  roleID: z.number().int().positive().optional(),
  username: z.string().optional(),
  email: z.string().email("Invalid email format").optional(),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  birthday: z.string().optional(),
  status: z.boolean().optional(),
  image_url: z.string().optional(),
  modifiedByID: z.number().int().optional(),
});
