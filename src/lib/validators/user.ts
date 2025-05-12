import { z } from "zod";

export const signUpUserSchema = z.object({
    first_name: z.string()
        .min(2, "Le prénom doit contenir au moins 2 caractères"),

    last_name: z.string()
        .min(2, "Le nom doit contenir au moins 2 caractères"),

    email: z.string()
        .email("Veuillez entrer une adresse email valide"),

    password: z.string()
        .min(4, "Le mot de passe doit contenir au moins 4 caractères")
        .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
        .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre"),

    password_confirmation: z.string()
}).refine(
    (data) => data.password === data.password_confirmation,
    {
        message: "Les mots de passe ne correspondent pas",
        path: ["password_confirmation"]
    }
);

export type SignUpUserFormData = z.infer<typeof signUpUserSchema>;