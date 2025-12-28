import { useParams, useNavigate } from "react-router-dom";
import { useKost } from "../context/KostContext";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function PemilikEditKost() {
  const { id } = useParams();
  const { getKostById, updateKost } = useKost();
  const { user } = useAuth();
  const navigate = useNavigate();

  const kost = getKostById(id);

  if (!kost) return <p className="p-6">Kost tidak ditemukan.</p>;

  if (Number(kost.ownerId) !== Number(user?.id)) {
    return <div className="p-6 text-red-600 font-semibold">Anda tidak punya izin untuk mengedit kost ini.</div>;
  }

  const [nama, setNama] = useState(kost.nama || "");
  const [lokasi, setLokasi] = useState(kost.lokasi || "");
  const [harga, setHarga] = useState(kost.harga || 0);
  const [deskripsi, setDeskripsi] = useState(kost.deskripsi || "");
  const [fasilitas, setFasilitas] = useState((kost.fasilitas || []).join(", "));

  const handleSubmit = (e) => {
    e.preventDefault();

    updateKost(kost.id, {
      nama,
      lokasi,
      harga: Number(harga),
      deskripsi,
      fasilitas: fasilitas.split(",").map((f) => f.trim()).filter(Boolean),
    });

    alert("Perubahan tersimpan.");
    navigate("/pemilik");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Kost</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Nama</label>
          <input value={nama} onChange={(e) => setNama(e.target.value)} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block font-medium">Lokasi</label>
          <input value={lokasi} onChange={(e) => setLokasi(e.target.value)} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block font-medium">Harga</label>
          <input type="number" value={harga} onChange={(e) => setHarga(e.target.value)} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block font-medium">Fasilitas (pisahkan koma)</label>
          <input value={fasilitas} onChange={(e) => setFasilitas(e.target.value)} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block font-medium">Deskripsi</label>
          <textarea value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} className="w-full border p-2 rounded" />
        </div>

        <button className="bg-green-600 text-white px-4 py-2 rounded">Simpan</button>
      </form>
    </div>
  );
}
