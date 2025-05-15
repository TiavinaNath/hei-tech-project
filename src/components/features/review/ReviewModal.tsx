'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

interface ReviewModalProps {
  providerId: string
  requestId: string
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function ReviewModal({
  providerId,
  requestId,
  isOpen,
  onClose,
  onSuccess,
}: ReviewModalProps) {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isAlreadyReviewed, setIsAlreadyReviewed] = useState(false)

  useEffect(() => {
    const checkReview = async () => {
      const { data } = await supabase
        .from('reviews')
        .select('id')
        .eq('request_id', requestId)
        .maybeSingle()

      if (data) setIsAlreadyReviewed(true)
    }

    if (requestId) checkReview()
  }, [requestId])

  const handleSubmit = async () => {
    setSubmitting(true)
    setError(null)

    const { error: insertError } = await supabase.from('reviews').insert([
      {
        request_id: requestId,
        provider_id: providerId,
        rating,
        comment,
      },
    ])

    if (insertError) {
      setError("Erreur lors de l'envoi")
    } else {
      setComment('')
      setRating(5)
      setIsAlreadyReviewed(true)
      onClose()
      onSuccess?.()
    }

    setSubmitting(false)
  }

  if (!isOpen || isAlreadyReviewed) return null

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Laisser un avis</h2>

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Note (1 à 5)
          <input
            type="number"
            min={1}
            max={5}
            className="w-full border border-gray-300 p-2 rounded mt-1"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          />
        </label>

        <label className="block mb-4 text-sm font-medium text-gray-700">
          Commentaire
          <textarea
            className="w-full border border-gray-300 p-2 rounded mt-1"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            {submitting ? 'Envoi...' : 'Envoyer'}
          </button>
        </div>
      </div>
    </div>
  )
}
