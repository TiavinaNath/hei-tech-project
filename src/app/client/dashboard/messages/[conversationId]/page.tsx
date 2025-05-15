'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams} from 'next/navigation';
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

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [providerId, setProviderId] = useState<string | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);


  // 1. Get session user
  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUserId(session?.user?.id ?? null);
    };
    getSession();
  }, []);

  // 2. Load messages
  useEffect(() => {
    if (conversationId) {
      getMessagesByConversationId(conversationId).then(setMessages);
    }
  }, [conversationId]);

  // 3. Subscribe to real-time messages
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

  // 4. Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 5. Fetch proposal + request info
useEffect(() => {
  const fetchData = async () => {
    const { data: conv } = await supabase
      .from('conversations')
      .select('request_id, provider_id')
      .eq('id', conversationId)
      .maybeSingle();

    if (conv) {
      setRequestId(conv.request_id);
      setProviderId(conv.provider_id); // 👈

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


  // Send a chat message
  const handleSend = async () => {
    if (!message.trim() || !userId) return;
    await sendMessage({ conversationId, senderId: userId, content: message });
    setMessage('');
  };

  // Send a proposal
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

  // Marquer prestation comme terminée
  const handleCompleteService = async () => {
    if (!requestId) return;

    const { error } = await supabase
      .from('client_requests')
      .update({ status: 'COMPLETED' })
      .eq('id', requestId);

    if (!error) {
      setShowReviewModal(true); // 👉 Affiche le modal au lieu de rediriger
      setRequestStatus('COMPLETED'); // Met à jour localement le statut
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {/* Messages */}
      <div className="h-[400px] overflow-y-scroll border rounded p-2 mb-4 bg-white shadow">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-2 ${msg.sender_id === userId ? 'text-right' : 'text-left'}`}
          >
            <p className={`inline-block px-3 py-2 rounded ${
              msg.sender_id === userId ? 'bg-blue-100' : 'bg-gray-100'
            }`}>
              {msg.content}
            </p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Formulaire d'envoi */}
      <div className="flex gap-2 mb-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Écrire un message..."
          className="flex-1 border px-3 py-2 rounded"
        />
        <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Envoyer
        </button>
        {!proposal && (
          <button onClick={() => setShowProposalForm(true)} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Conclure un accord
          </button>
        )}
      </div>

      {/* Proposition en cours */}
      {proposal && (
        <div className="mb-4 p-3 bg-yellow-50 border rounded">
          <p className="font-semibold">Votre proposition : {proposal.price} €</p>
          <p>Note : {proposal.note || '—'}</p>
          <p>Status : <span className={`font-bold ${
            proposal.status === 'ACCEPTED' ? 'text-green-600' :
            proposal.status === 'REJECTED' ? 'text-red-600' :
            'text-gray-600'
          }`}>{proposal.status}</span></p>
        </div>
      )}

      {/* Formulaire de proposition */}
      {showProposalForm && (
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

      {/* Prestation terminée */}
    {proposal?.status === 'ACCEPTED' && requestStatus === 'IN_PROGRESS' && (
  <button
    onClick={handleCompleteService}
    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
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
