import { supabase } from '@/lib/supabaseClient';

export const getMessagesByConversationId = async (conversationId: string) => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('sent_at', { ascending: true });

  if (error) throw error;
  return data;
};

export const sendMessage = async ({
  conversationId,
  senderId,
  content,
  attachmentUrl,
}: {
  conversationId: string;
  senderId: string;
  content: string;
  attachmentUrl?: string;
}) => {
  const { data, error } = await supabase.from('messages').insert([
    {
      conversation_id: conversationId,
      sender_id: senderId,
      content,
      attachment_url: attachmentUrl || null,
    },
  ]);

  if (error) throw error;
  return data;
};
