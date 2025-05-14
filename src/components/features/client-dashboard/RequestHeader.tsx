import { format } from 'date-fns'
import { MapPin, CalendarDays } from 'lucide-react'

export default function RequestHeader({ request }: { request: any }) {
  return (
    <div className="relative w-full max-w-[800px] mx-auto">
      {/* Carte principale AVEC TROU */}
      <div
        className="relative bg-white rounded-3xl shadow-xl z-10 overflow-hidden pt-10 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
        style={{
          WebkitMaskImage: 
            'radial-gradient(circle 28px at center top, transparent 0px, transparent 20px, white 21px)',
          maskImage: 
            'radial-gradient(circle 28px at center top, transparent 0px, transparent 20px, white 21px)',
          WebkitMaskComposite: 'destination-out',
          maskComposite: 'exclude',
        }}
      >
        <div className="px-6 pb-6">
          {/* Badge Service */}
          <div className="absolute top-4 right-4 bg-[#d0e4ff] text-[#457bed] px-4 py-2 text-xs rounded-full shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl cursor-pointer">
            {request.services?.name || 'Service'}
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-1 space-y-3">
              {/* Titre */}
              <div className="flex items-center gap-2 text-[#457bed]">
                <h1 className="text-xl md:text-2xl font-bold transition-transform duration-300 hover:scale-105">
                  {request.title}
                </h1>
              </div>

              {/* Description */}
              <div className="flex items-center gap-2 text-gray-500">
                <p>{request.description}</p>
              </div>

              {/* Adresse */}
              <div className="flex items-center gap-3">
                {/* Change the icon color to blue */}
                <div className="bg-[#d0e4ff] p-1.5 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:scale-110">
                  <MapPin size={16} className="text-[#457bed]" />
                </div>
                <p className="text-base">{request.address_text}</p>
              </div>

              {/* Date */}
              <div className="flex items-center gap-3">
                <div className="bg-[#d0e4ff] p-1.5 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:scale-110">
                  <CalendarDays size={16} className="text-[#457bed]" />
                </div>
                <p className="text-base">
                  {format(new Date(request.preferred_date_time), 'EEEE dd MMMM yyyy à HH:mm')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
