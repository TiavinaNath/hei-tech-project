'use client';

import { RequestProvider, useRequest } from '@/contexts/RequestContext';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabaseClient';

const steps = ['/client/request/date', '/client/request/time', '/client/request/address', '/client/request/phone', '/client/request/details'];

export default function RequestLayout({ children }: { children: ReactNode }) {
  return (
      <RequestProvider>
        <StepLayout>{children}</StepLayout>
      </RequestProvider>
  );
}

function StepLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data } = useRequest();

  const currentStepIndex = steps.indexOf(pathname);
  const isLastStep = currentStepIndex === steps.length - 1;

  const [canProceed, setCanProceed] = useState(false);

  // Vérification basique de validité pour chaque étape (à adapter)
  useEffect(() => {
    switch (pathname) {
      case '/client/request/date':
        setCanProceed(!!data.date);
        break;
      case '/client/request/time':
        setCanProceed(!!data.time);
        break;
      case '/client/request/address':
        setCanProceed(!!data.address);
        break;
      case '/client/request/phone':
        setCanProceed(!!data.phone);
        break;
      case '/client/request/details':
        setCanProceed(!!data.title && !!data.description);
        break;
      default:
        setCanProceed(true);
    }
  }, [pathname, data]);

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      router.push(steps[currentStepIndex - 1]);
    }
  };



  const handleNext = async () => {
    if (!isLastStep) {
    router.push(steps[currentStepIndex + 1]);
  } else if (!data.userId || !data.serviceId || !data.date || !data.time || !data.coordinates) {
    alert("Données incomplètes !");
    return;
  } else {
  // Crée un datetime combiné (format ISO)
  const dateOnly = data.date.split('T')[0]; // "2025-04-26"
  const preferredDateTime = new Date(`${dateOnly}T${data.time}:00`);

  const requestPayload = {
    client_id: data.userId,
    service_id: data.serviceId,
    title: data.title ?? '',
    description: data.description ?? '',
    address_text: data.address ?? '',
    location: `POINT(${data.coordinates.lon} ${data.coordinates.lat})`,
    is_public: true,
    target_provider_id: null,
    preferred_date_time: preferredDateTime.toISOString(),
    contact_phone: data.phone ?? '',
    status: 'PENDING',
    agreed_price: null,
    agreed_notes: null,
  };

  const { data: insertedRequest, error } = await supabase
    .from('client_requests')
    .insert([requestPayload])
    .select();

  if (error) {
    console.error('Erreur Supabase:', error.message);
    alert("Une erreur est survenue !");
  } else {
    console.log('Demande postée :', insertedRequest);
    // Redirige vers la page de succès
    //router.push('/request/success');
  }
}
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <main className="flex-1 p-6">{children}</main>

      <footer className="flex justify-between items-center p-4 border-t bg-white">
        <Button variant="outline" onClick={handlePrevious} disabled={currentStepIndex === 0}>
          Précédent
        </Button>
        <Button onClick={handleNext} disabled={!canProceed}>
          {isLastStep ? 'Poster la demande' : 'Continuer'}
        </Button>
      </footer>
    </div>
  );
}
