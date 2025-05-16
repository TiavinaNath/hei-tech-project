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
  <div className="flex justify-center">
  <div className="flex flex-col items-center gap-5 bg-white rounded-xl p-6 shadow-lg border border-blue-100 w-auto">
    <h2 className="text-2xl font-bold text-[#457bed]">Choisissez une date</h2>

    <div>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={handleSelect}
        className="rounded-lg border border-blue-200 shadow-sm p-4"
      />
    </div>
  </div>
</div>

  );
}
