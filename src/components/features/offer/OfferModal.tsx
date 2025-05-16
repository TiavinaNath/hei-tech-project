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
        className="mt-6 bg-[#457bed] hover:bg-[#457bed] text-white font-bold py-2 px-4 rounded"
        style={{width: '58%', borderRadius: '10px'}}
      >
        Faire une offre
      </button>

      {isOpen && (
<div className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4">
  <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-lg animate-fade-in">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Nouvelle offre</h2>

    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
      <textarea
        className="w-full border border-gray-300 focus:border-amber-600 focus:ring-amber-600 p-3 rounded-lg shadow-sm transition"
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
    </div>

    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-700 mb-1">Prix proposé (en Ariary)</label>
      <input
        type="number"
        className="w-full border border-gray-300 focus:border-amber-600 focus:ring-amber-600 p-3 rounded-lg shadow-sm transition"
        value={proposedPrice}
        onChange={(e) => setProposedPrice(e.target.value)}
      />
    </div>

    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

    <div className="flex justify-end gap-3">
      <button
        onClick={() => setIsOpen(false)}
        className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
      >
        Annuler
      </button>
      <button
        onClick={handleSubmit}
        disabled={submitting}
        className={`px-4 py-2 rounded-lg text-white transition ${
          submitting
            ? 'bg-[#457bed] cursor-not-allowed'
            : 'bg-[#457bed] hover:bg-amber-700'
        }`}
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
