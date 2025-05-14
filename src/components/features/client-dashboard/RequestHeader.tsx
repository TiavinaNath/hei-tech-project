import { format } from 'date-fns'

export default function RequestHeader({ request }: { request: any }) {
  return (
    <>
      <h1 className="text-2xl font-bold text-amber-900">{request.title}</h1>
      <p className="mt-2 text-gray-600">{request.description}</p>
      <p className="mt-2">📍 {request.address_text}</p>
      <p className="mt-2">
        🕒 {format(new Date(request.preferred_date_time), 'EEEE dd MMMM yyyy à HH:mm')}
      </p>
      <p className="mt-2">🛠 Service : {request.services?.name}</p>
    </>
  )
}
