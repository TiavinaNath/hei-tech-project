'use client';

import { useServices } from '@/contexts/ServicesContext';
import { useRouter } from 'next/navigation';

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
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Demander un service</h2>
          <button onClick={onClose}>❌</button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => handleSelect(service.id)}
              className="p-4 border rounded hover:bg-gray-100"
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
