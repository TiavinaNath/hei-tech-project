'use client';

import { useEffect, useRef, useState } from 'react';
import { getMessagesByConversationId, sendMessage } from '@/lib/supabase/messages';
import { supabase } from '@/lib/supabase/client';
import { useParams } from 'next/navigation';

type Message = {
  id: string;
  sender_id: string;
  content: string;
  sent_at: string;
};

export default function ConversationPage() {
  const { conversationId } = useParams() as { conversationId: string };
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [showProposal, setShowProposal] = useState(false);
  const [proposalNote, setProposalNote] = useState('');
  const [proposalPrice, setProposalPrice] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Récupère l'utilisateur courant
  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUserId(session?.user?.id ?? null);
    };

    getSession();
  }, []);

  // Récupère les messages initiaux
  useEffect(() => {
    if (conversationId) {
      getMessagesByConversationId(conversationId).then(setMessages);
    }
  }, [conversationId]);

  // Scroll vers le bas à chaque message reçu
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Realtime
  useEffect(() => {
    if (!conversationId) return;

    const channel = supabase
      .channel(`conversation-${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages((prev) => [...prev, newMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  const handleSend = async () => {
    if (!message.trim() || !userId) return;

    await sendMessage({
      conversationId,
      senderId: userId,
      content: message,
    });

    setMessage('');
  };

const handleSendProposal = async () => {
  if (!proposalPrice || !userId) return;

  // Étape 1 : récupérer request_id depuis conversations
  const { data: convData, error: convError } = await supabase
    .from('conversations')
    .select('request_id')
    .eq('id', conversationId)
    .maybeSingle();

  if (convError || !convData?.request_id) {
    console.error('Erreur récupération du request_id', convError);
    return;
  }

  // Étape 2 : insérer la proposition avec request_id
  const { error } = await supabase.from('final_price_proposals').insert({
    conversation_id: conversationId,
    request_id: convData.request_id, // ✅ Important !
    proposed_by: userId,
    price: Number(proposalPrice),
    note: proposalNote,
  });

  if (error) {
    console.error('Erreur envoi proposition', error);
  } else {
    setShowProposal(false);
    setProposalNote('');
    setProposalPrice('');
  }
};


  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="h-[400px] overflow-y-scroll border rounded p-2 mb-4 bg-white shadow">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-2 ${msg.sender_id === userId ? 'text-right' : 'text-left'}`}
          >
            <p
              className={`inline-block px-3 py-2 rounded ${
                msg.sender_id === userId ? 'bg-blue-100' : 'bg-gray-100'
              }`}
            >
              {msg.content}
            </p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2 mb-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Écrire un message..."
          className="flex-1 border px-3 py-2 rounded"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Envoyer
        </button>
        <button
          onClick={() => setShowProposal(!showProposal)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Conclure un accord
        </button>
      </div>

      {showProposal && (
        <div className="border rounded p-4 bg-gray-50 mb-4 shadow">
          <h2 className="text-lg font-semibold mb-2">Proposition d’accord</h2>
          <div className="mb-2">
            <label className="block mb-1">Prix final (€)</label>
            <input
              type="number"
              value={proposalPrice}
              onChange={(e) => setProposalPrice(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Note (optionnelle)</label>
            <textarea
              value={proposalNote}
              onChange={(e) => setProposalNote(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <button
            onClick={handleSendProposal}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Envoyer la proposition
          </button>
        </div>
      )}
    </div>
  );
}
