// contexts/RequestContext.tsx
'use client';

import { createContext, useContext, useState } from 'react';

type RequestData = {
  serviceId?: string;
  date?: string;
  time?: string;
  address?: string;
  coordinates?: { lat: number; lon: number };
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

  const setData = (newData: Partial<RequestData>) => {
    setRequestData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <RequestContext.Provider value={{ data, setData }}>
      {children}
    </RequestContext.Provider>
  );
};
