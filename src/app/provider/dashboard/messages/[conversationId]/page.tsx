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
  const [requestStatus, setRequestStatus] = useState<string | null>(null);

  const fetchRequestStatus = async () => {
  const { data: convData, error: convError } = await supabase
    .from('conversations')
    .select('request_id')
    .eq('id', conversationId)
    .maybeSingle();

  if (convError || !convData?.request_id) {
    console.error('Erreur récupération request_id', convError);
    return;
  }

  const requestId = convData.request_id;

  const { data: requestData, error: requestError } = await supabase
    .from('client_requests')
    .select('status')
    .eq('id', requestId)
    .maybeSingle();

  if (requestError) {
    console.error('Erreur récupération status de la demande', requestError);
    return;
  }

  setRequestStatus(requestData?.status ?? null);
};



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
      fetchRequestStatus();
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

    if (error) console.error('Erreur récupération proposition', error);
    else setProposal(data);
  };

  const handleRespondToProposal = async (accept: boolean) => {
    if (!proposal) return;
    const status = accept ? 'ACCEPTED' : 'REJECTED';

    const { data: convData, error: convError } = await supabase
      .from('conversations')
      .select('request_id')
      .eq('id', conversationId)
      .maybeSingle();

    if (convError || !convData?.request_id) {
      console.error('Erreur récupération request_id depuis conversation', convError);
      return;
    }

    const requestId = convData.request_id;

    const { error: proposalError } = await supabase
      .from('final_price_proposals')
      .update({ status })
      .eq('id', proposal.id);

    if (proposalError) {
      console.error('Erreur mise à jour proposition', proposalError);
      return;
    }

    if (accept) {
      const { error: updateRequestError } = await supabase
        .from('client_requests')
        .update({
          status: 'IN_PROGRESS',
          agreed_price: proposal.price,
          agreed_notes: proposal.note,
          agreed_at: new Date().toISOString(),
        })
        .eq('id', requestId);

      if (updateRequestError) {
        console.error('Erreur mise à jour de la demande client', updateRequestError);
        return;
      }

      const { error: rejectOthersError } = await supabase
        .from('final_price_proposals')
        .update({ status: 'REJECTED' })
        .eq('conversation_id', conversationId)
        .neq('id', proposal.id);

      if (rejectOthersError) {
        console.error('Erreur rejet autres propositions', rejectOthersError);
        return;
      }
    }

    await fetchLatestProposal();
  };

  useEffect(() => {
    if (!conversationId) return;

    const channel = supabase
      .channel(`proposal-${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'final_price_proposals',
          filter: `conversation_id=eq.${conversationId}`,
        },
        fetchLatestProposal
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'final_price_proposals',
          filter: `conversation_id=eq.${conversationId}`,
        },
        fetchLatestProposal
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Messages */}
      <div className="bg-white border rounded-xl shadow-md h-[400px] overflow-y-auto p-4 space-y-2 mb-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender_id === userId ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-xs text-sm ${
                msg.sender_id === userId
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Zone d’envoi */}

      {requestStatus !== 'COMPLETED' && (
          <div className="flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Écrivez votre message..."
          className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Envoyer
        </button>
      </div>
      )
      }
    

      {/* Proposition d’accord */}
      {proposal && (
        <div className="mt-8 p-6 bg-gray-50 border rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Proposition d’accord</h3>
          <p className="mb-1"><strong>Prix :</strong> {proposal.price} €</p>
          {proposal.note && <p className="mb-1"><strong>Note :</strong> {proposal.note}</p>}
          <p className="mb-2"><strong>Status :</strong> {proposal.status}</p>

          {proposal.status === 'PENDING' && (
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => handleRespondToProposal(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Accepter
              </button>
              <button
                onClick={() => handleRespondToProposal(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
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
