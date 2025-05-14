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
    <div>
      <h2>Où le service est-il requis ?</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => searchAddress(e.target.value)}
        placeholder="Ex: 12 rue Victor Hugo, Paris"
      />
      <ul>
        {results.map((item) => (
          <li key={item.place_id} onClick={() => selectAddress(item)} style={{ cursor: 'pointer' }}>
            {item.display_name}
          </li>
        ))}
      </ul>
    </div>
  );
}
