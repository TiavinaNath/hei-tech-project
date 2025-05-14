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
    <div className="flex flex-col gap-4 max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold">À quel numéro de téléphone le prestataire pourra-t-il vous joindre ?</h2>

      <div className="flex gap-2">
        <select
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-2 bg-white text-sm"
        >
          <option value="+261">MG</option>
        </select>

        <Input
          type="text"
          value={contact}
          onChange={handleChange}
          placeholder="123 45 678"
          maxLength={9}
          className="flex-1"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="bg-blue-50 text-sm text-gray-700 rounded-md p-3 flex items-start gap-2">
        <span className="text-blue-600 font-bold">ℹ</span>
        Ces informations seront transmises uniquement aux prestataires que vous réserverez.
      </div>
    </div>
  );
}
