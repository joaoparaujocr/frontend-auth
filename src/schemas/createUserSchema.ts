import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().trim(),
  email: z.string().email().trim(),
  password: z.string().trim()
})

export type CreateUserSchemaType = z.infer<typeof createUserSchema>