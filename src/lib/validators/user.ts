import { z } from 'zod'

const UserRole = z.enum(['user', 'admin']) 

export const UserCreateSchema = z.object({
    email: z.string().email('Email invalide'),
    password: z.string()
        .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
        .regex(/[A-Z]/, 'Doit contenir au moins une majuscule')
        .regex(/[0-9]/, 'Doit contenir au moins un chiffre'),
    confirmPassword: z.string(),
    first_name: z.string()
        .min(2, 'Le prénom doit contenir au moins 2 caractères')
        .max(50, 'Le prénom ne peut excéder 50 caractères'),
    last_name: z.string()
        .min(2, 'Le nom doit contenir au moins 2 caractères')
        .max(50, 'Le nom ne peut excéder 50 caractères'),
    role: UserRole.default('user')
}).refine(data => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"]
})

export type UserCreateInput = z.infer<typeof UserCreateSchema>