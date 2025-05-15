import { supabase } from './client';

export const startOrGetConversation = async ({
  requestId,
  clientId,
  providerId,
}: {
  requestId: string;
  clientId: string;
  providerId: string;
}) => {
  // 1. Chercher une conversation existante
  const { data: existing, error: fetchError } = await supabase
    .from('conversations')
    .select('id')
    .eq('request_id', requestId)
    .eq('client_id', clientId)
    .eq('provider_id', providerId)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    throw fetchError;
  }

  // 2. Retourner l’existante si elle existe
  if (existing) return existing.id;

  // 3. Créer sinon
  const { data: created, error: createError } = await supabase
    .from('conversations')
    .insert({
      request_id: requestId,
      client_id: clientId,
      provider_id: providerId,
    })
    .select('id')
    .single();

  if (createError) throw createError;

  return created.id;
};
