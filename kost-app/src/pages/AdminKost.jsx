import { useKost } from "../context/KostContext";
import AdminSidebar from "../components/AdminSidebar/AdminSidebar";
import { Link } from "react-router-dom";


function AdminKost() {
  const { kostList, removeKost } = useKost();

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-0 md:ml-64 w-full p-6">
        <h2 className="text-2xl font-bold mb-4">Data Kost</h2>
        {kostList.length === 0 ? (
          <p>Tidak ada data kost.</p>
        ) : (
          <table className="w-full border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Nama</th>
                <th className="p-2 border">Lokasi</th>
                <th className="p-2 border">Harga</th>
                <th className="p-2 border">Fasilitas</th>
              </tr>
            </thead>
            <tbody>
            {kostList.map((kost) => (
              <tr key={kost.id}>
                <td className="p-2 border">{kost.nama}</td>
                <td className="p-2 border">{kost.lokasi}</td>
                <td className="p-2 border">{kost.harga}</td>
                <td className="p-2 border">{kost.fasilitas?.join(", ")}</td>
                <td className="p-2 border flex gap-2">
                <Link
                  to={`/admin/kost/edit/${kost.id}`}
                  className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500">
                  Edit
                </Link>
              </td>
                <td className="p-2 border">
                <button
                  onClick={() => {
                    if (window.confirm("Apakah Anda yakin ingin menghapus kost ini?")) {
                      removeKost(kost.id);
                    }
                  }}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Hapus
                </button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdminKost;
