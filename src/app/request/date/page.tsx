'use client';

import { Calendar } from '@/components/ui/calendar';
import { useRequest } from '@/contexts/RequestContext';
import { useState } from 'react';

export default function DatePage() {
  const { setData } = useRequest();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const handleSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      setData({ date: date.toISOString() });
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-semibold">Choisissez une date</h2>
      <Calendar mode="single" selected={selectedDate} onSelect={handleSelect} />
    </div>
  );
}
