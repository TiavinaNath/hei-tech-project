'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'

interface OfferModalProps {
  requestId: string
  onSuccess?: () => void
}

export default function OfferModal({ requestId, onSuccess }: OfferModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [proposedPrice, setProposedPrice] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/user')
      const { userId } = await res.json()

      if (!userId) {
        setError('Utilisateur non authentifié')
        setSubmitting(false)
        return
      }

      const { error: insertError } = await supabase.from('offers').insert([
        {
          request_id: requestId,
          provider_id: userId,
          message,
          proposed_price: Number(proposedPrice),
        },
      ])

      if (insertError) {
        console.error(insertError)
        setError("Erreur lors de l'envoi")
      } else {
        setMessage('')
        setProposedPrice('')
        setIsOpen(false)
        if (onSuccess) onSuccess()
      }
    } catch (err) {
      console.error(err)
      setError('Erreur réseau')
    }

    setSubmitting(false)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="mt-6 bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded"
      >
        Faire une offre
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Nouvelle offre</h2>

            <label className="block mb-2 text-sm font-medium text-gray-700">
              Message
              <textarea
                className="w-full border border-gray-300 p-2 rounded mt-1"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </label>

            <label className="block mb-4 text-sm font-medium text-gray-700">
              Prix proposé (en Ariary)
              <input
                type="number"
                className="w-full border border-gray-300 p-2 rounded mt-1"
                value={proposedPrice}
                onChange={(e) => setProposedPrice(e.target.value)}
              />
            </label>

            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
              >
                Annuler
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded"
              >
                {submitting ? 'Envoi...' : 'Envoyer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
