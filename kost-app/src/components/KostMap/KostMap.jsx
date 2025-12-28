import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useEffect, useState } from "react";
import { useKost } from "../../context/KostContext";

function SetMapView({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.setView(coords, 13);
    }
  }, [coords]);
  return null;
}

function KostMap({ onFilterByDistance }) {
  const { kostList } = useKost();
  const [userLocation, setUserLocation] = useState(null);

  // Ambil lokasi pengguna
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLocation([pos.coords.latitude, pos.coords.longitude]);
    });
  }, []);

  // Hitung jarak dari user ke kost (haversine formula)
  const getDistanceKm = (lat1, lon1, lat2, lon2) => {
    const toRad = (x) => (x * Math.PI) / 180;
    const R = 6371; // radius bumi dalam KM
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  // Trigger filter kost dalam radius 5 KM
  useEffect(() => {
    if (userLocation && onFilterByDistance) {
      const filtered = kostList.filter((kost) => {
        if (!kost.latitude || !kost.longitude) return false;
        const distance = getDistanceKm(
          userLocation[0],
          userLocation[1],
          kost.latitude,
          kost.longitude
        );
        return distance <= 5; // bisa diubah radiusnya
      });
      onFilterByDistance(filtered);
    }
  }, [userLocation, kostList]);

  return (
    <div className="w-full h-[400px] mb-6 rounded overflow-hidden shadow">
      <MapContainer center={[-2.15, 106.13]} zoom={13} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='© <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {userLocation && (
          <Marker position={userLocation}>
            <Popup>Lokasi kamu</Popup>
          </Marker>
        )}
        {kostList.map((kost) =>
          kost.latitude && kost.longitude ? (
            <Marker key={kost.id} position={[kost.latitude, kost.longitude]}>
              <Popup>
                <b>{kost.nama}</b><br />
                {kost.lokasi}<br />
                Rp {kost.harga.toLocaleString()}
              </Popup>
            </Marker>
          ) : null
        )}
        {userLocation && <SetMapView coords={userLocation} />}
      </MapContainer>
    </div>
  );
}

export default KostMap;
