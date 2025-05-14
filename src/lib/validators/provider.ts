import { z } from "zod";

export const step1Schema = z.object({
    first_name: z.string().min(1, "Le prénom est requis"),
    last_name: z.string().min(1, "Le nom est requis"),
    email: z.string().email("Email invalide"),
    password: z.string().min(6, "Minimum 6 caractères"),
    password_confirmation: z.string(),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Les mots de passe ne correspondent pas",
    path: ["password_confirmation"],
});

export const step2Schema = z.object({
    phone: z.string().min(1, "Téléphone requis"),
    bio: z.string().min(10, "Décrivez un minimum vos services"),
    birth_date: z.string().min(1, "Date requise"),
    mobile: z.boolean(),
});

export const step3Schema = z.object({
    address: z.string().min(1, "Adresse requise"),
    service_radius: z
        .string()
        .min(1, "Minimum 1 km")
        .optional()
        .nullable()
        .refine((value) => value !== null, {
            message: "Obligatoire si vous êtes en déplacement",
            path: ["service_radius"],
        }),
});

export const step4Schema = z.object({
    profile_picture: z.any().optional(),
});
