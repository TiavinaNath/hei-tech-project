type LocationSectionProps = {
  fixed_location: { latitude: number; longitude: number } | null;
};

export default function LocationSection({
  fixed_location,
}: LocationSectionProps) {
  const lat = fixed_location?.latitude ?? -18.8692; // fallback Antananarivo
  const lng = fixed_location?.longitude ?? 47.522;

  const bbox = `${lng - 0.016},${lat - 0.01},${lng + 0.016},${lat + 0.01}`;
  const marker = `${lat},${lng}`;
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}`;

  return (
    <section>
      <h2 className="text-2xl font-semibold text-[#457bed] mb-4">
        Localisation
      </h2>
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="h-64 bg-gray-100 rounded-lg mb-4 relative overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            src={mapUrl}
            className="absolute inset-0"
          />
        </div>
        <p className="text-gray-700">
          <strong>Adresse:</strong> {lat.toFixed(4)}, {lng.toFixed(4)}
        </p>
        <p className="text-gray-500 text-sm mt-2">
          (Adresse exacte disponible après réservation)
        </p>
      </div>
    </section>
  );
}
