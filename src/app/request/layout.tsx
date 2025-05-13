'use client';

import { RequestProvider, useRequest } from '@/contexts/RequestContext';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const steps = ['/request/date', '/request/time', '/request/address', '/request/details'];

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
      case '/request/date':
        setCanProceed(!!data.date);
        break;
      case '/request/time':
        setCanProceed(!!data.time);
        break;
      case '/request/address':
        setCanProceed(!!data.address);
        break;
      case '/request/details':
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

  const handleNext = () => {
    if (!isLastStep) {
      router.push(steps[currentStepIndex + 1]);
    } else {
      // Ici tu postes la demande (API call possible)
      alert('Demande postée avec succès !');
      console.log('Données de la demande :', data);
      // router.push('/request/success') par exemple
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
