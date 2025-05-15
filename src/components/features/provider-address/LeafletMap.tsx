"use client";

import { MapContainer, TileLayer, Marker, Circle } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

type Props = {
  center: LatLngExpression;
  radius: number;
};

export default function LeafletMap({ center, radius }: Props) {
  const svgIcon = L.icon({
    iconUrl: "/map-marker-svgrepo-com.svg", // chemin relatif à la racine public/
    iconSize: [30, 30], // adapte la taille selon ton SVG
    iconAnchor: [15, 30], // point d'ancrage (souvent bas-centre)
    popupAnchor: [0, -30], // optionnel, pour positionner un popup
  });
  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={false}
      className="h-full w-full z-0"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center} icon={svgIcon} />
      <Circle
        center={center}
        radius={radius}
        pathOptions={{ fillColor: "#457bed", fillOpacity: 0.2, stroke: false }}
      />
    </MapContainer>
  );
}
