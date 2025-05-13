'use client';

import { createContext, useContext, useState } from 'react';

export type Service = {
  id: string;
  name: string;
};

const ServicesContext = createContext<Service[] | null>(null);

export const useServices = () => {
  const context = useContext(ServicesContext);
  if (context === null) {
    throw new Error('useServices must be used within a ServicesProvider');
  }
  return context;
};

type Props = {
  initialServices: Service[];
  children: React.ReactNode;
};

export const ServicesProvider = ({ initialServices, children }: Props) => {
  const [services] = useState<Service[]>(initialServices);

  return (
    <ServicesContext.Provider value={services}>
      {children}
    </ServicesContext.Provider>
  );
};
