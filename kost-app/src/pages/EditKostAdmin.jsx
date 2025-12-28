import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useKost } from "../context/KostContext";
import AdminSidebar from "../components/AdminSidebar/AdminSidebar";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

/* Pilih lokasi lewat klik peta */
function LocationSelector({ setLatLng }) {
  useMapEvents({
    click(e) {
      setLatLng(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

const ALL_FASILITAS = [
  "AC",
  "Kamar Mandi Dalam",
  "WiFi",
  "Dapur Bersama",
  "Parkiran",
];

function EditKostAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { kostList, updateKost } = useKost();
  const kost = kostList.find((k) => k.id === Number(id));
  const mapRef = useRef(null);

  const [form, setForm] = useState({
    nama: "",
    lokasi: "",
    harga: "",
    deskripsi: "",
    fasilitas: [],
    latitude: null,
    longitude: null,
    foto: [],
  });

  /* isi form */
  useEffect(() => {
    if (kost) {
      setForm({
        nama: kost.nama,
        lokasi: kost.lokasi,
        harga: kost.harga,
        deskripsi: kost.deskripsi || "",
        fasilitas: kost.fasilitas || [],
        latitude: kost.latitude,
        longitude: kost.longitude,
        foto: kost.foto || [],
      });
    }
  }, [kost]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const toggleFasilitas = (item) => {
    setForm((p) => ({
      ...p,
      fasilitas: p.fasilitas.includes(item)
        ? p.fasilitas.filter((f) => f !== item)
        : [...p.fasilitas, item],
    }));
  };

  const handleFotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((f) => URL.createObjectURL(f));
    setForm((p) => ({ ...p, foto: [...p.foto, ...urls] }));
  };

  const removeFoto = (index) => {
    setForm((p) => ({
      ...p,
      foto: p.foto.filter((_, i) => i !== index),
    }));
  };

  const setLatLng = (lat, lng) => {
    setForm((p) => ({ ...p, latitude: lat, longitude: lng }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateKost(kost.id, {
      ...form,
      harga: Number(form.harga),
    });

    alert("Data kost berhasil diperbarui");
    navigate("/admin/kost");
  };

  if (!kost) return <div className="p-6">Kost tidak ditemukan</div>;

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-0 md:ml-64 w-full p-6">
        <h2 className="text-xl font-bold mb-4">Edit Kost</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="nama" value={form.nama} onChange={handleChange} className="w-full border px-3 py-2" placeholder="Nama Kost" />
          <input name="lokasi" value={form.lokasi} onChange={handleChange} className="w-full border px-3 py-2" placeholder="Alamat" />
          <input name="harga" value={form.harga} onChange={handleChange} className="w-full border px-3 py-2" placeholder="Harga" />

          <textarea name="deskripsi" value={form.deskripsi} onChange={handleChange} className="w-full border px-3 py-2" placeholder="Deskripsi" />

          {/* Fasilitas */}
          <div>
            <p className="font-semibold mb-1">Fasilitas</p>
            {ALL_FASILITAS.map((f) => (
              <label key={f} className="block">
                <input
                  type="checkbox"
                  checked={form.fasilitas.includes(f)}
                  onChange={() => toggleFasilitas(f)}
                />{" "}
                {f}
              </label>
            ))}
          </div>

          {/* Foto */}
          <div>
            <p className="font-semibold mb-1">Foto Kost</p>
            <div className="flex gap-3 flex-wrap">
              {form.foto.map((src, i) => (
                <div key={i} className="relative">
                  <img src={src} className="w-24 h-24 object-cover rounded" />
                  <button
                    type="button"
                    onClick={() => removeFoto(i)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <input type="file" multiple accept="image/*" onChange={handleFotoUpload} />
          </div>

          {/* Map */}
          {form.latitude && (
            <MapContainer
              center={[form.latitude, form.longitude]}
              zoom={15}
              style={{ height: 300 }}
              whenCreated={(m) => (mapRef.current = m)}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationSelector setLatLng={setLatLng} />
              <Marker position={[form.latitude, form.longitude]} />
            </MapContainer>
          )}

          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditKostAdmin;
