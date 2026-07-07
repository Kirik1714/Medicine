import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface MedicationMapProps {
  latitude?: number;
  longitude?: number;
}

export function MedicationMap({ latitude = 40.665, longitude = -73.916 }: MedicationMapProps) {
  const position: [number, number] = [latitude, longitude];

  return (
    <div className="w-full h-44 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-xs relative z-0">
      <MapContainer 
        center={position} 
        zoom={13} 
        scrollWheelZoom={false} 
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="dark:invert dark:hue-rotate-180 dark:contrast-95 dark:brightness-95"
        />
        <Marker position={position} />
      </MapContainer>
    </div>
  );
}