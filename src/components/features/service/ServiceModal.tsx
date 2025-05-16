'use client';

import { useServices } from '@/contexts/ServicesContext';
import { useRouter } from 'next/navigation';
import { X } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ServiceModal = ({ isOpen, onClose }: Props) => {
  const services = useServices();
  const router = useRouter();

  if (!isOpen) return null;

  const handleSelect = (serviceId: string) => {
  localStorage.setItem('selectedServiceId', serviceId);
  router.push('/client/request/date');
  onClose();
  };

  return (
   <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
  <div className="bg-white rounded-2xl shadow-2xl p-8 w-[90%] max-w-xl border border-blue-200">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-semibold text-[#457bed]">Demander un service</h2>
      <button
  onClick={onClose}
  className="text-blue-600 hover:text-blue-800 transition"
  aria-label="Fermer"
>
  <X size={20} />
</button>

    </div>

    <div className="grid grid-cols-2 gap-4">
      {services.map((service) => (
        <button
          key={service.id}
          onClick={() => handleSelect(service.id)}
          className="p-4 rounded-xl border border-blue-100 bg-blue-50 text-[#457bed] font-medium hover:bg-blue-100 hover:shadow-md transition-all"
        >
          {service.name}
        </button>
      ))}
    </div>
  </div>
</div>

  );
};

export default ServiceModal;
