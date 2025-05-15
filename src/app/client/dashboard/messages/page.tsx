'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'

type Conversation = {
  id: string
  provider: {
    first_name: string
  } | null
  request: {
    title: string
  } | null
}

const ClientMessagesPage = () => {
  const [userId, setUserId] = useState<string | null>(null)
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error || !data.user) {
        console.error('Erreur récupération utilisateur', error)
        setLoading(false)
      } else {
        setUserId(data.user.id)
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  useEffect(() => {
    if (!userId) return

    const fetchConversations = async () => {
  const { data, error } = await supabase
    .from('conversations')
    .select(`
      id,
      provider:provider_id(first_name),
      request:request_id(title)
    `)
    .eq('client_id', userId)

  if (error) {
    console.error('Erreur chargement conversations', error)
  } else if (data) {
    const formatted = data.map((conv) => ({
      id: conv.id,
      provider: Array.isArray(conv.provider) ? conv.provider[0] : conv.provider,
      request: Array.isArray(conv.request) ? conv.request[0] : conv.request,
    }))
    setConversations(formatted)
  }
}

    fetchConversations()
  }, [userId])

  if (loading) return <p>Chargement...</p>
  if (!userId) return <p>Utilisateur non connecté.</p>

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Mes conversations</h1>
      <ul className="space-y-3">
        {conversations.map((conv) => (
          <li key={conv.id} className="border p-3 rounded bg-white shadow">
            <p><strong>Prestataire :</strong> {conv.provider?.first_name ?? 'Inconnu'}</p>
            <p><strong>Demande :</strong> {conv.request?.title ?? 'N/A'}</p>
            <Link
              href={`/client/dashboard/messages/${conv.id}`}
              className="text-blue-500 underline mt-2 inline-block"
            >
              Ouvrir la conversation
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ClientMessagesPage
