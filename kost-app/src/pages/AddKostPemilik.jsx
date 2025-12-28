import { useState } from "react";
import { useKost } from "../context/KostContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import LocationPicker from "../components/LocationPicker/LocationPicker";

export default function AddKostPemilik() {
  const { addKost } = useKost();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [nama, setNama] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [harga, setHarga] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [fasilitas, setFasilitas] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [fotoBase64, setFotoBase64] = useState([]);
  const [fotoPreview, setFotoPreview] = useState([]);
  
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoBase64((prev) => [...prev, reader.result]);
        setFotoPreview((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newKost = {
      id: Date.now(),
      nama,
      lokasi,
      harga: Number(harga),
      deskripsi,
      fasilitas: fasilitas.split(",").map((f) => f.trim()).filter(Boolean),
      ownerId: Number(user.id), // penting
      foto: fotoBase64,
      latitude,
      longitude,
    };

    addKost(newKost);
    alert("Kost berhasil ditambahkan.");
    navigate("/pemilik");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Tambah Kost</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Nama" className="w-full border p-2 rounded" required />
        <input value={lokasi} onChange={(e) => setLokasi(e.target.value)} placeholder="Lokasi" className="w-full border p-2 rounded" required />
        <input value={harga} onChange={(e) => setHarga(e.target.value)} placeholder="Harga" type="number" className="w-full border p-2 rounded" required />
        <input value={fasilitas} onChange={(e) => setFasilitas(e.target.value)} placeholder="Fasilitas (pisahkan koma)" className="w-full border p-2 rounded" />
        <textarea value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} placeholder="Deskripsi" className="w-full border p-2 rounded" />
        <div>
            <label className="block mb-1 font-semibold">Pilih Lokasi di Peta</label>
            <LocationPicker
              onLocationChange={(pos) => {
                setLatitude(pos.lat);
                setLongitude(pos.lng);
              }}
            />
            {latitude && longitude && (
              <p className="text-sm text-gray-600 mt-2">Koordinat: {latitude.toFixed(5)}, {longitude.toFixed(5)}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-semibold">Upload Foto Kost</label>
            <input type="file" multiple accept="image/*" onChange={handleImageChange} className="w-full" />
            <div className="flex gap-2 mt-2">
              {fotoPreview.map((src, idx) => (
                <img key={idx} src={src} className="w-24 h-24 object-cover rounded" />
              ))}
            </div>
          </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Tambah</button>
      </form>
    </div>
  );
}
