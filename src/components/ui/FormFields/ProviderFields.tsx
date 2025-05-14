"use client";

export const PROVIDER_FIELDS = {
  step2: [
    {
      id: "phone",
      label: "Téléphone",
      type: "tel",
      placeholder: "Votre numéro",
    },
    {
      id: "bio",
      label: "Bio",
      type: "textarea",
      placeholder: "Décrivez vos services",
    },
    { id: "birth_date", label: "Date de naissance", type: "date" },
    { id: "mobile", label: "En déplacement", type: "checkbox" },
  ],
  step3: [
    {
      id: "address",
      label: "Adresse",
      placeholder: "Votre localisation",
      type: "address-autocomplete",
    },
    {
      id: "service_radius",
      label: "Rayon de déplacement (km)",
      type: "number",
      showIf: "mobile",
    },
  ],
  step4: [{ id: "profile_picture", label: "Photo de profil", type: "file" }],
};
