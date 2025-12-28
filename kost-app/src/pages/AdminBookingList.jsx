import { useBooking } from "../context/BookingContext";
import { useKost } from "../context/KostContext";
import { useAuth } from "../context/AuthContext";
import AdminSidebar from "../components/AdminSidebar/AdminSidebar";

function AdminBookingList() {
  const { bookings, setBookings } = useBooking();
  const { kostList } = useKost();
  const { user } = useAuth();

  const handleStatusChange = (id, status) => {
    const updated = bookings.map((b) =>
      b.id === id ? { ...b, status } : b
    );
    setBookings(updated);
  };

  const handleDelete = (id) => {
    if (confirm("Yakin ingin menghapus pemesanan ini?")) {
      const updated = bookings.filter((b) => b.id !== id);
      setBookings(updated);
    }
  };

  if (user?.role !== "admin") {
    return <div className="p-6 text-red-600">Akses hanya untuk admin.</div>;
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-0 md:ml-64 w-full p-6">
        <h2 className="text-2xl font-bold mb-4">Daftar Pemesanan Kost</h2>
        {bookings.length === 0 ? (
          <p>Belum ada pemesanan.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border text-sm">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2 border">Nama Pemesan</th>
                  <th className="p-2 border">No. WhatsApp</th>
                  <th className="p-2 border">Kost</th>
                  <th className="p-2 border">Tgl Masuk</th>
                  <th className="p-2 border">Tgl Keluar</th>
                  <th className="p-2 border">Status</th>
                  <th className="p-2 border">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => {
                  const kost = kostList.find((k) => k.id === b.kostId);
                  return (
                    <tr key={b.id} className="border-t">
                      <td className="p-2 border">{b.nama}</td>
                      <td className="p-2 border">{b.nomorTelepon}</td>
                      <td className="p-2 border">{kost?.nama}</td>
                      <td className="p-2 border">{b.tanggalMasuk}</td>
                      <td className="p-2 border">{b.tanggalKeluar}</td>
                      <td className="p-2 border capitalize">{b.status}</td>
                      <td className="p-2 border space-x-2">
                        <button
                          onClick={() => handleStatusChange(b.id, "disetujui")}
                          className="bg-green-500 text-white px-2 py-1 rounded text-xs"
                        >
                          Setujui
                        </button>
                        <button
                          onClick={() => handleStatusChange(b.id, "ditolak")}
                          className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                        >
                          Tolak
                        </button>
                        <button
                          onClick={() => handleDelete(b.id)}
                          className="bg-gray-500 text-white px-2 py-1 rounded text-xs"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminBookingList;
