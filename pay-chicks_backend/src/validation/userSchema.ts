// validation/userSchema.ts
import { z } from "zod";

// validation/userSchema.ts
export const registerUserSchema = z.object({
  username: z.string().min(3),
  firstname: z.string().min(1),
  lastname: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().min(10, "Phone is required"), // ✅ required
  address: z.string().min(5),
});


export type RegisterUserInput = z.infer<typeof registerUserSchema>;
