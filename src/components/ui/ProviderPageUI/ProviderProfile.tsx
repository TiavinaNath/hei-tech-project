"use client";
import { useState } from "react";
import { Provider } from "@/type/provider";

type Category = {
  id: string;
  name: string;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const categories: Category[] = [
  { id: "72e77b75-e886-4f3f-b8fa-8579dafe01b2", name: "Cours" },
  { id: "7e27e6b3-5445-48c6-bfaa-28acb03491a3", name: "Esthtétique" },
  { id: "c5dac7b5-0f77-4502-bfee-1553c4a541dd", name: "Autres" },
  { id: "eab4ae7b-04c6-41e7-bda1-93ef51683cfc", name: "Mécanicien" },
  { id: "eb0f2e2d-806d-46c9-bffa-9e680047021c", name: "Couture" },
  { id: "00f852ec-d2f5-44c2-834a-e47ebf9539f1", name: "Course" },
  { id: "1a830618-292f-4fba-9c4b-f63584db4b19", name: "Jardinage" },
  { id: "21df1b7f-cf22-40fd-ac79-baa01378f4cc", name: "Transport" },
  { id: "27ee83b5-a754-49aa-ba5a-8a5c5cd2fde4", name: "Bricolage" },
  { id: "2e3e0c96-6e71-4083-9f31-1e245f251762", name: "Plomberie" },
  { id: "31135e93-aaaa-4a3a-88a8-deafb8a49b85", name: "Réparation" },
];

export default function ProviderProfile({
  provider,
  modification = false,
}: {
  provider: Provider;
  modification?: boolean;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [experienceYears, setExperienceYears] = useState("");

  const averageRating =
    provider.reviews.length > 0
      ? (
          provider.reviews.reduce(
            (sum: number, review: any) => sum + review.rating,
            0
          ) / provider.reviews.length
        ).toFixed(1)
      : "Pas encore évalué";

  const handleEditClick = () => {
    setIsEditing(true);
    const currentCategory = provider.provider_services[0]?.service?.id || "";
    setSelectedCategoryId(currentCategory);
    setExperienceYears("");
  };

  const handleSave = async () => {
    if (!selectedCategoryId || !experienceYears) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/provider_services`,
        {
          method: "POST",
          headers: {
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            "Content-Type": "application/json",
            Prefer: "return=representation",
          },
          body: JSON.stringify({
            provider_id: provider.id,
            service_id: selectedCategoryId,
            experience_years: Number(experienceYears),
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Échec de l'enregistrement");
      }

      const data = await res.json();
      setIsEditing(false);
    } catch (error) {
      console.error("Erreur :", error);
      alert("Une erreur est survenue lors de la sauvegarde.");
    }
  };

  return (
    <div className="lg:w-1/3 lg:fixed lg:h-screen lg:overflow-hidden bg-gray-100 flex flex-col items-center pt-12 px-6">
      {/* Photo de profil */}
      <div className="relative w-64 h-64 mb-8 rounded-full overflow-hidden border-4 border-[#00c896] shadow-lg">
        <img
          src={provider.profile_photo_url || "/default-profile.jpg"}
          alt={`${provider.user.first_name} ${provider.user.last_name}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Infos texte */}
      <div className="text-center bg-white p-6 rounded-xl shadow-sm w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800">
          {provider.user.first_name} {provider.user.last_name}
        </h2>

        {/* Service */}
        {provider.provider_services.length > 0 && !isEditing && (
          <p className="text-[#457bed] font-medium mt-2 text-lg">
            {provider.provider_services[0].service.name}
          </p>
        )}

        {modification && !isEditing && (
          <button
            onClick={handleEditClick}
            className="mt-2 text-sm text-blue-600 underline hover:text-blue-800"
          >
            Modifier
          </button>
        )}

        {/* Inputs en mode édition */}
        {isEditing && (
          <div className="mt-4 flex flex-col items-center gap-3">
            <select
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              className="border p-2 rounded w-full"
            >
              <option value="">Choisir une catégorie</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              value={experienceYears}
              onChange={(e) => setExperienceYears(e.target.value)}
              className="border p-2 rounded w-full"
              placeholder="Votre année d'expérience dans le domaine"
              min="0"
            />

            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded mt-2"
            >
              Enregistrer
            </button>
          </div>
        )}

        {/* Note moyenne */}
        <div className="flex items-center justify-center mt-4">
          <div className="flex items-center bg-[#457bed]/10 px-4 py-2 rounded-full">
            <svg
              className="w-6 h-6 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-2 text-gray-700 font-medium">
              {averageRating}{" "}
              {typeof averageRating === "string"
                ? ""
                : `(${provider.reviews.length} avis)`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
