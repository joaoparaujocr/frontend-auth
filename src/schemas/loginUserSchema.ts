import { z } from "zod";
import { createUserSchema } from "./createUserSchema";

export const loginUserSchema = createUserSchema.omit({ name: true })

export type LoginUserSchemaType = z.infer<typeof loginUserSchema>