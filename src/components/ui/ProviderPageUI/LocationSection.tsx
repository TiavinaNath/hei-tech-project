'use client';

import dynamic from 'next/dynamic';
import { parseWKBToLatLngBrowser } from '@/lib/utils/geo';
import type { LatLngExpression } from 'leaflet';

const LeafletMap = dynamic(() => import('@/components/features/provider-address/LeafletMap'), {
  ssr: false,
});

type LocationSectionProps = {
  fixed_location: string | null;
  travel_radius_km: number;
};

export default function LocationSection({
  fixed_location,
  travel_radius_km,
}: LocationSectionProps) {
  const location = fixed_location
    ? parseWKBToLatLngBrowser(fixed_location)
    : null;

  const lat = location?.latitude ?? -18.8692;
  const lng = location?.longitude ?? 47.522;
  const center: LatLngExpression = [lat, lng];

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold text-[#457bed] mb-4">Localisation</h2>

      <p className="text-gray-700 mb-2">
        <strong>Adresse:</strong> {lat.toFixed(4)}, {lng.toFixed(4)} <br />
        <span className="text-sm text-gray-500 italic">
          (Adresse exacte disponible après réservation)
        </span>
      </p>

      <div className="h-72 w-full rounded-lg overflow-hidden">
        <LeafletMap center={center} radius={travel_radius_km * 1000} />
      </div>
    </section>
  );
}
