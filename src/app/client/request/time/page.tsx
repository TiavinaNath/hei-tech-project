'use client';

import { useRequest } from '@/contexts/RequestContext';
import { useState } from 'react';
import { Clock } from "lucide-react";

export default function TimePage() {
  const { setData } = useRequest();
  const [selectedTime, setSelectedTime] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedTime(value);
    setData({ time: value });
  };

  return (
    <div className="flex justify-center items-center">
    <div className="flex flex-col items-center gap-4 bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm">
  <h2 className="text-xl font-semibold text-[#457bed]">Choisissez une heure</h2>
  <input
    type="time"
    value={selectedTime}
    onChange={handleChange}
    className="w-full px-4 py-2 border border-blue-300 text-[#457bed] rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out"
  />
</div>
    </div>
  );
}
