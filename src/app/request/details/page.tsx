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
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-semibold">Décrivez votre besoin</h2>
      <input
        placeholder="Titre"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          handleChange();
        }}
        className="border p-2 rounded w-full max-w-md"
      />
      <textarea
        placeholder="Description détaillée"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          handleChange();
        }}
        className="border p-2 rounded w-full max-w-md h-32"
      />
    </div>
  );
}
