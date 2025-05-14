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
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Récupère l'utilisateur courant
  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

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

  // Realtime avec Supabase
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
    // Inutile de re-fetch, le realtime se charge de l'ajouter
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

      <div className="flex gap-2">
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
    </div>
  );
}
