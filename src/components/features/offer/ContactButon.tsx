import { useRouter } from 'next/navigation';
import { startOrGetConversation } from '@/lib/supabase/conversations';

const ContactButton = ({
  requestId,
  clientId,
  providerId,
  isClientView,
}: {
  requestId: string;
  clientId: string;
  providerId: string;
  isClientView: boolean;
}) => {
  const router = useRouter();

  const handleContact = async () => {
    try {
      const conversationId = await startOrGetConversation({
        requestId,
        clientId,
        providerId,
      });

      const rolePath = isClientView ? 'client' : 'provider';
      router.push(`/${rolePath}/dashboard/messages/${conversationId}`);
    } catch (error) {
      console.error('Erreur lors de la création de la conversation :', error);
      alert('Impossible d’ouvrir la conversation.');
    }
  };

  return (
    <button onClick={handleContact} className="bg-green-500 text-white px-4 py-2 rounded">
      Contacter
    </button>
  );
};

export default ContactButton;
