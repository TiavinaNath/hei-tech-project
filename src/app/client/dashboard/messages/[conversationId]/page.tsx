'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { getMessagesByConversationId, sendMessage } from '@/lib/supabase/messages';
import ReviewModal from '@/components/features/review/ReviewModal';

type Message = {
  id: string;
  sender_id: string;
  content: string;
  sent_at: string;
};

type Proposal = {
  id: string;
  price: number;
  note: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
};

export default function ConversationPage() {
  const { conversationId } = useParams() as { conversationId: string };
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState<string | null>(null);

  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [proposalNote, setProposalNote] = useState('');
  const [proposalPrice, setProposalPrice] = useState('');

  const [requestStatus, setRequestStatus] = useState<string | null>(null);
  const [requestId, setRequestId] = useState<string | null>(null);
  const [providerId, setProviderId] = useState<string | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

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
    }
  }, [conversationId]);

  useEffect(() => {
    if (!conversationId) return;
    const channel = supabase
      .channel(`conversation-${conversationId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `conversation_id=eq.${conversationId}`,
      }, (payload) => {
        const newMessage = payload.new as Message;
        setMessages((prev) => [...prev, newMessage]);
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [conversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: conv } = await supabase
        .from('conversations')
        .select('request_id, provider_id')
        .eq('id', conversationId)
        .maybeSingle();

      if (conv) {
        setRequestId(conv.request_id);
        setProviderId(conv.provider_id);

        const { data: proposal } = await supabase
          .from('final_price_proposals')
          .select('*')
          .eq('conversation_id', conversationId)
          .eq('proposed_by', userId)
          .order('created_at', { ascending: false })
          .maybeSingle();

        if (proposal) setProposal(proposal);

        const { data: req } = await supabase
          .from('client_requests')
          .select('status')
          .eq('id', conv.request_id)
          .maybeSingle();

        if (req?.status) setRequestStatus(req.status);
      }
    };

    if (conversationId && userId) fetchData();
  }, [conversationId, userId]);

  const handleSend = async () => {
    if (!message.trim() || !userId) return;
    await sendMessage({ conversationId, senderId: userId, content: message });
    setMessage('');
  };

  const handleSendProposal = async () => {
    if (!proposalPrice || !userId || !requestId) return;

    const { error } = await supabase.from('final_price_proposals').insert({
      conversation_id: conversationId,
      request_id: requestId,
      proposed_by: userId,
      price: Number(proposalPrice),
      note: proposalNote,
    });

    if (!error) {
      setProposal({
        id: '',
        price: Number(proposalPrice),
        note: proposalNote,
        status: 'PENDING',
      });
      setShowProposalForm(false);
      setProposalNote('');
      setProposalPrice('');
    }
  };

  const handleCompleteService = async () => {
    if (!requestId) return;

    const { error } = await supabase
      .from('client_requests')
      .update({ status: 'COMPLETED' })
      .eq('id', requestId);

    if (!error) {
      setShowReviewModal(true);
      setRequestStatus('COMPLETED');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="h-[420px] overflow-y-auto bg-white border rounded-lg shadow-sm p-4 mb-6 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender_id === userId ? 'justify-end' : 'justify-start'}`}>
            <div className={`px-4 py-2 max-w-[70%] rounded-xl text-sm ${
              msg.sender_id === userId ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {requestStatus !== 'COMPLETED' && (
      <div className="flex items-center gap-3 mb-4">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Écrire un message..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
        >
          Envoyer
        </button>
        {!proposal && (
          <button
            onClick={() => setShowProposalForm(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-semibold"
          >
            Proposer un accord
          </button>
        )}
      </div>
      )}

      

      {proposal && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg mb-6">
          <p className="text-sm font-medium">Votre proposition : <span className="font-bold">{proposal.price} €</span></p>
          <p className="text-sm">Note : {proposal.note || '—'}</p>
          <p className="text-sm">Statut : <span className={`font-bold ${
            proposal.status === 'ACCEPTED' ? 'text-green-600' :
            proposal.status === 'REJECTED' ? 'text-red-600' : 'text-gray-600'
          }`}>{proposal.status}</span></p>
        </div>
      )}

      {showProposalForm && (
        <div className="bg-gray-50 border rounded-lg p-4 mb-6 space-y-3 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800">Nouvelle proposition</h3>
          <div>
            <label className="block text-sm font-medium mb-1">Prix (Ariary)</label>
            <input
              type="number"
              value={proposalPrice}
              onChange={(e) => setProposalPrice(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Note (optionnelle)</label>
            <textarea
              value={proposalNote}
              onChange={(e) => setProposalNote(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            onClick={handleSendProposal}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold"
          >
            Envoyer la proposition
          </button>
        </div>
      )}

      {proposal?.status === 'ACCEPTED' && requestStatus === 'IN_PROGRESS' && (
        <button
          onClick={handleCompleteService}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold mb-4"
        >
          Marquer la prestation comme terminée
        </button>
      )}

      {showReviewModal && providerId && requestId && (
        <ReviewModal
          isOpen={showReviewModal}
          providerId={providerId}
          requestId={requestId}
          onClose={() => setShowReviewModal(false)}
        />
      )}
    </div>
  );
}
