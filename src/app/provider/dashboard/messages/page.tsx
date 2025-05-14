'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'
import Link from 'next/link'

type Conversation = {
  id: string
  client: {
    first_name: string
  } | null
  request: {
    title: string
  } | null
}

const ProviderMessagesPage = () => {
  const [user, setUser] = useState<User | null>(null)
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error) {
        console.error('Erreur récupération utilisateur', error)
      } else {
        setUser(data.user)
      }
      setLoading(false)
    }

    fetchUser()
  }, [])

  useEffect(() => {
    if (!user) return

    const fetchConversations = async () => {
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          id,
          client:client_id(first_name),
          request:request_id(title)
        `)
        .eq('provider_id', user.id)

      if (error) {
        console.error('Erreur chargement conversations', error)
      } else if (data) {
        const parsed = data.map((conv) => ({
          id: conv.id,
          client: Array.isArray(conv.client) ? conv.client[0] : conv.client,
          request: Array.isArray(conv.request) ? conv.request[0] : conv.request,
        })) as Conversation[]

        setConversations(parsed)
      }
    }


    fetchConversations()
  }, [user])

  if (loading) return <p>Chargement...</p>
  if (!user) return <p>Utilisateur non connecté.</p>

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Mes conversations</h1>
      <ul className="space-y-3">
        {conversations.map((conv) => (
          <li key={conv.id} className="border p-3 rounded bg-white shadow">
            <p><strong>Client :</strong> {conv.client?.first_name ?? 'Inconnu'}</p>
            <p><strong>Demande :</strong> {conv.request?.title ?? 'N/A'}</p>
            <Link
              href={`/provider/dashboard/messages/${conv.id}`}
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

export default ProviderMessagesPage
