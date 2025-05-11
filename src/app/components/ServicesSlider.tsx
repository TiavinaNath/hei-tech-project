'use client'

import { supabase } from '@/lib/supabaseClient'
import { useEffect, useState } from 'react'

export default function ServicesSlider() {
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

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

  if (loading) return <p>Chargement...</p>

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="border p-4 rounded-lg shadow hover:shadow-md transition"
          >
            <h3 className="text-xl font-bold mb-2">{service.name}</h3>
            {service.image_url && (
              <img
                src={service.image_url}
                alt={service.name}
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
            )}
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
