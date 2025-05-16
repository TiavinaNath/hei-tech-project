'use client';

import { useRequest } from '@/contexts/RequestContext';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function ContactPage() {
  const { setData } = useRequest();
  const [contact, setContact] = useState('');
  const [error, setError] = useState('');
  const [countryCode, setCountryCode] = useState('+261');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setContact(value);

    const regex = /^\d{9}$/;
    if (!regex.test(value)) {
      setError("Le numéro doit contenir exactement 9 chiffres.");
    } else {
      setError('');
      setData({ phone: countryCode + value });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
<div className="flex flex-col gap-4 bg-white p-6 rounded-2xl shadow-lg w-full max-w-md mx-auto">
  <h2 className="text-xl font-semibold text-[#457bed]">
    Votre numéro
  </h2>

  <div className="flex gap-2">
    <select
      value={countryCode}
      onChange={(e) => setCountryCode(e.target.value)}
      className="border border-blue-300 rounded-xl px-3 py-2 bg-white text-[#457bed] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
    >
      <option value="+261">🇲🇬 +261</option>
      {/* Tu peux ajouter d'autres options ici si nécessaire */}
    </select>

    <input
      type="text"
      value={contact}
      onChange={handleChange}
      placeholder="123 45 678"
      maxLength={9}
      className="flex-1 border border-blue-300 rounded-xl px-4 py-2 bg-white text-[#457bed] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
    />
  </div>

  {error && <p className="text-red-500 text-sm">{error}</p>}

  <div className="bg-blue-50 text-sm text-gray-700 rounded-md p-3 flex items-start gap-2">
    <span className="text-blue-600 font-bold">ℹ</span>
    Ces informations seront transmises uniquement aux prestataires que vous réserverez.
  </div>
</div>
    </div>
  );
}
