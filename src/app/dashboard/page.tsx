'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { format } from 'date-fns'
import styles from '../style/MyRequestCard.module.css'
import { useRouter } from 'next/navigation'

export default function MyRequestPage() {
  const [requests, setRequests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchRequests = async () => {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession()

      if (sessionError || !session?.user) {
        console.error('Utilisateur non connecté ou erreur session:', sessionError)
        setLoading(false)
        return
      }

      const userId = session.user.id

      const { data, error } = await supabase
        .from('client_requests')
        .select(`
          id,
          title,
          description,
          preferred_date_time,
          address_text,
          status,
          offers(count),
          services(name)
        `)
        .eq('client_id', userId)

      if (error) {
        console.error('Erreur lors du fetch:', error)
      } else {
        setRequests(data)
      }

      setLoading(false)
    }

    fetchRequests()
  }, [])

  return (
    <div>
  <h1>Mes demandes</h1>

  {loading ? (
    <p>Chargement...</p>
  ) : requests.length === 0 ? (
    <p>Aucune demande trouvée.</p>
  ) : (
    <div className={styles.grid}>
      {requests.map((req, index) => (
        <div key={index} className={styles.card}>
          <div>
            <img
              src="https://d1vrukq96dal30.cloudfront.net/assets/categories/2001-142be5d05e49ce8efdb83c97b816c85afd7627924212dde9b035aae1aa14fdb1.svg"
              alt="avatar"
              className={styles.avatar}
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: '0.5em',
            }}
          >
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
              {req.title}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-2">
              {req.description}
            </p>
            <p className={styles.details}>
              {req.preferred_date_time
                ? `${format(
                    new Date(req.preferred_date_time),
                    'EEEE, MMMM dd, yyyy'
                  )} à ${format(new Date(req.preferred_date_time), 'HH:mm')}`
                : 'Non spécifié'}
            </p>
            <p className="text-m line-clamp-2">{req.address_text}</p>
            <p>{req.offers?.[0]?.count ?? 0} offre(s)</p>
            <button
              className={styles.button}
              onClick={() => router.push(`/dashboard/${req.id}`)}
            >
              Voir plus
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
  )
}
