import { useState } from "react";
import { useKost } from "../context/KostContext";
import AdminSidebar from "../components/AdminSidebar/AdminSidebar";
import LocationPicker from "../components/LocationPicker/LocationPicker";
import { useAuth } from "../context/AuthContext";

const fasilitasList = [
  "AC",
  "Kamar Mandi Dalam",
  "WiFi",
  "Dapur Bersama",
  "Parkiran",
];

function AddKostAdmin() {
  const { addKost } = useKost();
  const { user } = useAuth();

  const [nama, setNama] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [harga, setHarga] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [fasilitas, setFasilitas] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [fotoPreview, setFotoPreview] = useState([]);
  const [fotoBase64, setFotoBase64] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setFotoPreview([]);
    setFotoBase64([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoBase64((prev) => [...prev, reader.result]);
        setFotoPreview((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFasilitasChange = (item) => {
    setFasilitas((prev) =>
      prev.includes(item)
        ? prev.filter((f) => f !== item)
        : [...prev, item]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nama || !lokasi || !harga || !deskripsi) {
      alert("Semua field wajib diisi!");
      return;
    }

    if (isNaN(harga) || harga <= 0) {
      alert("Harga harus berupa angka dan lebih dari 0");
      return;
    }

    if (!latitude || !longitude) {
      alert("Silakan pilih lokasi di peta terlebih dahulu.");
      return;
    }

    if (fotoBase64.length === 0) {
      alert("Minimal upload 1 foto kost");
      return;
    }

    addKost({
      id: Date.now(),
      nama,
      lokasi,
      harga: parseInt(harga),
      deskripsi,
      fasilitas,
      foto: fotoBase64,
      latitude,
      longitude,
      ownerId: user?.id ?? null,
    });

    // reset form
    setNama("");
    setLokasi("");
    setHarga("");
    setDeskripsi("");
    setFasilitas([]);
    setLatitude(null);
    setLongitude(null);
    setFotoPreview([]);
    setFotoBase64([]);

    alert("Kost berhasil ditambahkan!");
  };

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="ml-0 md:ml-64 w-full p-6">
        <h2 className="text-xl font-bold mb-4">Tambah Kost</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Nama Kost"
            className="w-full border px-3 py-2"
          />

          <input
            value={lokasi}
            onChange={(e) => setLokasi(e.target.value)}
            placeholder="Alamat Lengkap"
            className="w-full border px-3 py-2"
          />

          <input
            type="number"
            min="0"
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
            placeholder="Harga per bulan"
            className="w-full border px-3 py-2"
          />

          <textarea
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            placeholder="Deskripsi Kost"
            className="w-full border px-3 py-2"
          />

          {/* FASILITAS */}
          <div>
            <label className="block font-semibold mb-2">Fasilitas</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {fasilitasList.map((item) => (
                <label key={item} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={fasilitas.includes(item)}
                    onChange={() => handleFasilitasChange(item)}
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          {/* MAP */}
          <div>
            <label className="block mb-1 font-semibold">
              Pilih Lokasi di Peta
            </label>
            <LocationPicker
              onLocationChange={(pos) => {
                setLatitude(pos.lat);
                setLongitude(pos.lng);
              }}
            />
            {latitude && longitude && (
              <p className="text-sm text-gray-600 mt-2">
                Koordinat: {latitude.toFixed(5)}, {longitude.toFixed(5)}
              </p>
            )}
          </div>

          {/* FOTO */}
          <div>
            <label className="block mb-1 font-semibold">
              Upload Foto Kost
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />

            {fotoPreview.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {fotoPreview.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded border"
                  />
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Tambah Kost
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddKostAdmin;
