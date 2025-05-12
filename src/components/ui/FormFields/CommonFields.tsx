import Field from "@/type/field";

export const COMMON_FIELDS: Field[] = [
  { id: "last_name", label: "Nom", placeholder: "Entrez votre nom" },
  { id: "first_name", label: "Prénom", placeholder: "Entrez votre prénom" },
  { id: "email", label: "Email", type: "email", placeholder: "Entrez votre email" },
  { id: "password", label: "Mot de passe", type: "password", placeholder: "Créez un mot de passe" },
  { id: "password_confirmation", label: "Confirmation", type: "password", placeholder: "Confirmez votre mot de passe" }
];