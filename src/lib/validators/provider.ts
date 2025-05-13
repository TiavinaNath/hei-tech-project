import { z } from "zod"

export const loginUserSchema = z.object({
    email: z.string().email({ message: "Email invalide" }),
    password: z.string().min(6, { message: "Mot de passe requis (6 caractères min)" }),
})

export type LoginUserFormData = z.infer<typeof loginUserSchema>
