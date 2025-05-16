'use client';

import { useRequest } from '@/contexts/RequestContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type NominatimResult = {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
};

export default function AddressPage() {
  const { setData } = useRequest();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<NominatimResult[]>([]);

  const searchAddress = async (value: string) => {
    setQuery(value);
    if (value.length > 3) {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${value}`);
      const data: NominatimResult[] = await res.json();
      setResults(data);
    }
  };

  const selectAddress = (item: NominatimResult) => {
    setData({
      address: item.display_name,
      coordinates: { lat: parseFloat(item.lat), lon: parseFloat(item.lon) },
    });
    router.push('/client/request/phone');
  };

  return (
<div className="flex flex-col gap-4 w-full max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg border border-blue-100">
  <h2 className="text-xl font-semibold text-[#457bed]">Où le service est-il requis ?</h2>

  <input
    type="text"
    value={query}
    onChange={(e) => searchAddress(e.target.value)}
    placeholder="Ex: 12 rue Victor Hugo, Paris"
    className="w-full px-4 py-2 border border-blue-300 text-black rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out"
  />

  {results.length > 0 && (
    <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
      {results.map((item) => (
        <li
          key={item.place_id}
          onClick={() => selectAddress(item)}
          className="cursor-pointer px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition text-sm text-[#457bed]"
        >
          {item.display_name}
        </li>
      ))}
    </ul>
  )}
</div>

  );
}
