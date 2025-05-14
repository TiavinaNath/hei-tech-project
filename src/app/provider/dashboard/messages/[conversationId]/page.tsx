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

type Proposal = {
  id: string;
  conversation_id: string;
  proposed_by: string;
  price: number;
  note: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  created_at: string;
};

export default function ConversationPage() {
  const { conversationId } = useParams() as { conversationId: string };
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUserId(session?.user?.id ?? null);
    };
    getSession();
  }, []);

  useEffect(() => {
    if (conversationId) {
      getMessagesByConversationId(conversationId).then(setMessages);
      fetchLatestProposal();
    }
  }, [conversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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

  const fetchLatestProposal = async () => {
    const { data, error } = await supabase
      .from('final_price_proposals')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Erreur récupération proposition', error);
    } else {
      setProposal(data);
    }
  };

 const handleRespondToProposal = async (accept: boolean) => {
  if (!proposal) return;
  const status = accept ? 'ACCEPTED' : 'REJECTED';

  // Met à jour la proposition
  const { error: proposalError } = await supabase
    .from('final_price_proposals')
    .update({ status })
    .eq('id', proposal.id);

  if (proposalError) {
    console.error('Erreur mise à jour proposition', proposalError);
    return;
  }

  if (accept) {
    // 🔁 Corrigé : récupérer la demande via conversations
    const { data: convData, error: convError } = await supabase
      .from('conversations')
      .select('request_id')
      .eq('id', conversationId)
      .maybeSingle();

    if (convError || !convData?.request_id) {
      console.error('Erreur récupération request_id depuis conversation', convError);
      return;
    }

    // Mise à jour de la demande client
    const { error: updateError } = await supabase
      .from('client_requests')
      .update({
        agreed_price: proposal.price,
        agreed_notes: proposal.note,
        agreed_at: new Date().toISOString(),
      })
      .eq('id', convData.request_id);

    if (updateError) {
      console.error('Erreur mise à jour demande client', updateError);
      return;
    }
  }

  await fetchLatestProposal(); // refresh l’état local
};

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {/* Zone de messages */}
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

      {/* Zone d’envoi */}
      <div className="flex gap-2 mb-6">
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
      </div>

      {/* Proposition d’accord */}
      {proposal && (
        <div className="border-t pt-4 mt-4">
          <h3 className="text-lg font-semibold mb-2">Proposition d’accord</h3>
          <p><strong>Prix :</strong> {proposal.price} €</p>
          {proposal.note && <p><strong>Note :</strong> {proposal.note}</p>}
          <p><strong>Status :</strong> {proposal.status}</p>

          {proposal.status === 'PENDING' && (
            <div className="mt-4 flex gap-4">
              <button
                onClick={() => handleRespondToProposal(true)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Accepter
              </button>
              <button
                onClick={() => handleRespondToProposal(false)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Refuser
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
