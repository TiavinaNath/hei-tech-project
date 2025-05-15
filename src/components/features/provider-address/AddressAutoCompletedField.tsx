// components/ui/AddressAutocomplete.tsx
"use client";

import { useEffect, useRef, useState } from "react";

interface AddressSuggestion {
  display_name: string;
  lat: string;
  lon: string;
}

export default function AddressAutocomplete({
  value,
  onChange,
  onSelect,
  placeholder,
  id,
}: {
  value: string;
  onChange: (value: string) => void;
  onSelect: (address: string, lat: number, lon: number) => void;
  placeholder?: string;
  id?: string;
}) {
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchSuggestions = async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5`,
        {
          headers: {
            'User-Agent': 'YourAppName/1.0 (your@email.com)'
          }
        }
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching address suggestions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange(value);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 300);
  };

  const handleSelect = (suggestion: AddressSuggestion) => {
    onChange(suggestion.display_name);
    onSelect(suggestion.display_name, parseFloat(suggestion.lat), parseFloat(suggestion.lon));
    setSuggestions([]);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative">
      <input
        id={id}
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-[#457bed] focus:outline-none focus:ring-2 focus:ring-[#457bed]/50"
        autoComplete="off"
      />
      
      {isLoading && (
        <div className="absolute z-10 mt-1 w-full rounded-lg bg-white p-2 shadow-lg">
          <div className="p-2 text-gray-500">Chargement...</div>
        </div>
      )}

      {suggestions.length > 0 && !isLoading && (
        <ul className="absolute z-10 mt-1 w-full rounded-lg bg-white shadow-lg">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="cursor-pointer p-2 hover:bg-gray-100"
              onClick={() => handleSelect(suggestion)}
            >
              {suggestion.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}