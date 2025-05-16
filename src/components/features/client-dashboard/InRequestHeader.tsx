import { format } from 'date-fns'
import { MapPin, CalendarDays } from 'lucide-react'
import { fr } from 'date-fns/locale'
import styles from '@/app/style/InrequestHeader.module.css'

export default function InRequestHeader({ request }: { request: any }) {
	return (
		<div className={styles.card}>
			<div className={styles.content}>
				{/* Remplace p par div ici */}
				<div className={styles.para}>
					<strong className="text-lg relative inline-block text-[#457bed]">
						{request.title}
						<span className="block w-70 h-0.5 bg-[#457bed] mt-1 mx-auto rounded-full"></span>
					</strong>

					<div className="mt-4 space-y-1">
						<div>
							{request.description}
							<span className="block w-70 h-0.5 mt-1 mx-auto rounded-full"></span>
						</div>

						<div>
							<div className="flex items-center gap-2">
								<div className="bg-[#457bed] rounded-full p-1 text-white">
									<MapPin size={22} />
								</div>
								{request.address_text}
							</div>

							<div className="flex items-center gap-2 mt-2">
								<div className="bg-[#457bed] rounded-full p-1 text-white">
									<CalendarDays
										size={22}
										className="flex items-center gap-2"
									/>
								</div>
								{format(new Date(request.preferred_date_time), "EEEE dd MMMM yyyy 'à' HH:mm", { locale: fr })
									.charAt(0)
									.toUpperCase() +
									format(new Date(request.preferred_date_time), "EEEE dd MMMM yyyy 'à' HH:mm", { locale: fr }).slice(1)}
							</div>

							<div className={styles.serviceTag}>
								{request.services?.name || 'Service'}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
