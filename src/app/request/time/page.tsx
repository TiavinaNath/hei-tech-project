'use client';

import { useRequest } from '@/contexts/RequestContext';
import { useState } from 'react';

export default function TimePage() {
  const { setData } = useRequest();
  const [selectedTime, setSelectedTime] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedTime(value);
    setData({ time: value });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-semibold">Choisissez une heure</h2>
      <input type="time" value={selectedTime} onChange={handleChange} className="border p-2 rounded" />
    </div>
  );
}
