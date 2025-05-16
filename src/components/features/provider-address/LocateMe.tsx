"use client";

import { useState } from "react";
import {
  getCurrentPosition,
  reverseGeocode,
} from "@/lib/utils/geolocalisation";

interface AutoLocateButtonProps {
  onChange: (value: string) => void; // met à jour l'input
  label?: string; // texte du bouton
}

export default function AutoLocateButton({
  onChange,
  label,
}: AutoLocateButtonProps) {
  const [loading, setLoading] = useState(false);
  const [located, setLocated] = useState(false);

  const handleGeolocation = async () => {
    setLoading(true);
    try {
      const position = await getCurrentPosition();
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const address = await reverseGeocode(lat, lon);
      if (address) {
        onChange(address);
        setLocated(true);
      }
    } catch (error) {
      console.error("Erreur de géolocalisation :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-2 flex items-center">
      <button
        type="button"
        onClick={handleGeolocation}
        disabled={loading}
        className="text-sm text-[#457bed] underline disabled:opacity-50"
      >
        {loading ? "Localisation..." : label || "Me localiser automatiquement"}
      </button>
      {located && (
        <span className="ml-2 text-xs text-green-600">✓ Adresse ajoutée</span>
      )}
    </div>
  );
}
