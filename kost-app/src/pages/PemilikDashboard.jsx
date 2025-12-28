import { useKost } from "../context/KostContext";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function PemilikDashboard() {
  const { kostList } = useKost();
  const { user } = useAuth();

  if (!user) return <p>Loading...</p>;

  // filter by ownerId (ensure numeric compare)
  const myKost = kostList.filter((k) => Number(k.ownerId) === Number(user.id));

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard Pemilik - {user.name}</h2>

      <Link to="/pemilik/tambah" className="bg-blue-600 text-white px-4 py-2 rounded inline-block mb-4">
        Tambah Kost Baru
      </Link>

      {myKost.length === 0 ? (
        <p>Kamu belum menambahkan kost.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {myKost.map((k) => (
            <div key={k.id} className="border p-4 rounded bg-white shadow-sm">
              <h3 className="font-semibold">{k.nama}</h3>
              <p className="text-sm text-gray-600">{k.lokasi}</p>
              <p className="mt-2">Rp {k.harga}</p>
              <div className="mt-3 flex gap-2">
                <Link to={`/pemilik/edit/${k.id}`} className="text-blue-600 hover:underline">Edit</Link>
                <Link to={`/kost/${k.id}`} className="text-gray-600 hover:underline">Lihat</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
