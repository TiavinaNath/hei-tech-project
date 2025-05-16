'use client';

import { useRequest } from '@/contexts/RequestContext';
import { useState } from 'react';

export default function DetailsPage() {
  const { setData } = useRequest();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleChange = () => {
    setData({ title, description });
  };

  return (
<div className="flex flex-col items-center gap-4 bg-white p-6 rounded-2xl shadow-lg w-full max-w-md mx-auto">
  <h2 className="text-xl font-semibold text-[#457bed]">Décrivez votre besoin</h2>

  <input
    placeholder="Titre"
    value={title}
    onChange={(e) => {
      setTitle(e.target.value);
      handleChange();
    }}
    className="w-full px-4 py-2 border border-blue-300 rounded-xl text-[#457bed] bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
  />

  <textarea
    placeholder="Description détaillée"
    value={description}
    onChange={(e) => {
      setDescription(e.target.value);
      handleChange();
    }}
    className="w-full px-4 py-2 border border-blue-300 rounded-xl text-[#457bed] bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 h-32 resize-none"
  />
</div>
  );
}
