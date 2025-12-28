import { useParams } from "react-router-dom";
import { useKost } from "../context/KostContext";
import BookingForm from "../components/BookingForm/BookingForm";
import { useBooking } from "../context/BookingContext";
import { useAuth } from "../context/AuthContext";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";


function Kostdetail() {
  const { id } = useParams();
  const { kostList } = useKost();
  const { bookings } = useBooking();
  const { user } = useAuth();
  const kost = kostList.find((k) => k.id === parseInt(id));
  const sudahBooking = bookings.some(b => b.kostId === kost.id && b.userId === user?.id);

  if (!kost) {
    return <div className="p-6 text-red-500">Data kost tidak ditemukan.</div>;
  }  

  return (
    <div className="p-6 max-w-screen-lg mx-auto">
      {/* Nama Kost */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">{kost.nama}</h1>

      {/* Gambar Kost */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {kost.foto.map((src, index) => (
          <div key={index} className="relative w-full h-64 overflow-hidden rounded-lg shadow-lg">
            <img
              src={src}
              alt={`Foto ${index + 1}`}
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* Lokasi dan Harga */}
      <div className="mb-6">
        <p className="text-lg font-semibold">
          <span className="text-gray-700">Lokasi:</span> {kost.lokasi}
        </p>
        <p className="text-lg font-semibold text-green-500">
          <span className="text-gray-700">Harga:</span> {kost.harga}
        </p>
      </div>
      {/* Deskripsi Kost */}
      <div className="mb-6">
        <p className="block text-xl text-gray-800 mb-2">
          <span className="text-gray-700">Deskripsi:</span>
        </p>
        <p className="text-gray-600 text-lg leading-relaxed">
          {kost.deskripsi}
        </p>
      </div>
      {/* Fasilitas */}
      <div className="mb-6">
        <strong className="block text-xl text-gray-800 mb-2">Fasilitas:</strong>
        <ul className="list-disc pl-6 space-y-2">
          {kost.fasilitas.map((f, index) => (
            <li key={index} className="text-gray-600 text-lg">{f}</li>
          ))}
        </ul>
      </div>
      {kost.latitude && kost.longitude && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Lokasi di Peta</h3>
          <div className="w-full h-64 rounded overflow-hidden shadow">
            <MapContainer
              center={[kost.latitude, kost.longitude]}
              zoom={16}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; OpenStreetMap'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[kost.latitude, kost.longitude]}>
                <Popup>{kost.nama}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      )}

      <BookingForm kostId={kost.id} />
    </div>
  );
}

export default Kostdetail;
