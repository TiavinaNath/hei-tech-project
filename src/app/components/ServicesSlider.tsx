'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function ServicesSlider() {
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [startIndex, setStartIndex] = useState(0)
  const [visibleCards, setVisibleCards] = useState(3)

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from('services')
        .select('name, description, image_url')

      if (error) {
        console.error('Erreur lors du fetch:', error)
      } else {
        setServices(data)
      }

      setLoading(false)
    }

    fetchServices()
  }, [])

  useEffect(() => {
    const updateVisibleCards = () => {
      const width = window.innerWidth
      if (width >= 1024) {
        setVisibleCards(3)
      } else if (width >= 768) {
        setVisibleCards(2)
      } else {
        setVisibleCards(1)
      }
    }

    updateVisibleCards()
    window.addEventListener('resize', updateVisibleCards)
    return () => window.removeEventListener('resize', updateVisibleCards)
  }, [])

  const handleNext = () => {
    if (startIndex + visibleCards < services.length) {
      setStartIndex(startIndex + 1)
    }
  }

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1)
    }
  }

  if (loading) {
    return <div className="text-center py-10">Chargement des services...</div>
  }

  return (
    <div className="relative w-full max-w-7xl mx-auto py-10 px-4 overflow-hidden">
      <div className="w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${(100 / visibleCards) * startIndex}%)` }}
        >
          {services.map((service, index) => (
            <div
              key={index}
              style={{ minWidth: `${100 / visibleCards}%` }}
              className="px-3"
            >
              <div
                className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl group transition-transform duration-300"
                style={{
                  backgroundImage: `url(${service.image_url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-end">
                  <h3 className="text-white text-2xl font-extrabold mb-2">{service.name}</h3>
                  <p className="text-white text-sm mb-4">{service.description}</p>
                  <button className="bg-white text-black font-medium py-2 px-5 rounded-full text-sm w-fit hover:bg-gray-100 transition-all">
                    Découvrir →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {startIndex > 0 && (
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white shadow-lg text-black w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition z-10"
        >
          ‹
        </button>
      )}

      {startIndex + visibleCards < services.length && (
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white shadow-lg text-black w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition z-10"
        >
          ›
        </button>
      )}
    </div>
  )
}
