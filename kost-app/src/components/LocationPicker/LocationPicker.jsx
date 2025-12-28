import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Marker icon fix for default icon in Leaflet
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

function LocationSelector({ onSelect }) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng);
    },
  });
  return null;
}

function LocationPicker({ onLocationChange }) {
  const [position, setPosition] = useState({ lat: -2.1291, lng: 106.1312 }); // Default: Bangka Belitung

  const handleSelect = (latlng) => {
    setPosition(latlng);
    onLocationChange(latlng);
  };

  return (
    <MapContainer center={position} zoom={13} style={{ height: "300px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <LocationSelector onSelect={handleSelect} />
      <Marker position={position} icon={markerIcon} />
    </MapContainer>
  );
}

export default LocationPicker;
