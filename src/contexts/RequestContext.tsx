'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // ajuste ce chemin selon ton projet

type RequestData = {
  userId?: string;
  serviceId?: string;
  date?: string;
  time?: string;
  address?: string;
  coordinates?: { lat: number; lon: number };
  phone?: string;
  title?: string;
  description?: string;
};

const RequestContext = createContext<{
  data: RequestData;
  setData: (newData: Partial<RequestData>) => void;
}>({
  data: {},
  setData: () => {},
});

export const useRequest = () => useContext(RequestContext);

export const RequestProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setRequestData] = useState<RequestData>({});
  const router = useRouter();

useEffect(() => {
  const fetchUserAndService = async () => {
    try {
      const res = await fetch('/api/user');
      if (!res.ok) {
        router.push('/auth/login');
        return;
      }

      const { userId } = await res.json();

      const serviceId = localStorage.getItem('selectedServiceId') || undefined;

      setRequestData((prev) => ({
        ...prev,
        userId,
        serviceId,
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération de l’utilisateur:', error);
      router.push('/auth/login');
    }
  };

  fetchUserAndService();
}, [router]);


  const setData = (newData: Partial<RequestData>) => {
    setRequestData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <RequestContext.Provider value={{ data, setData }}>
      {children}
    </RequestContext.Provider>
  );
};
