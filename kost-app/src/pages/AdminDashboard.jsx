import { useKost } from "../context/KostContext";
import { useBooking } from "../context/BookingContext";
import AdminSidebar from "../components/AdminSidebar/AdminSidebar";

function AdminDashboard() {
  const { kostList } = useKost();
  const { bookings } = useBooking();

  const jumlahDisetujui = bookings.filter(b => b.status === "disetujui").length;
  const jumlahMenunggu = bookings.filter(b => b.status === "menunggu").length;

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-0 md:ml-64 w-full p-6">
        <h2 className="text-2xl font-bold mb-6">Dashboard Admin</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow p-4 rounded">
            <h3 className="text-lg font-semibold">Total Kost</h3>
            <p className="text-2xl">{kostList.length}</p>
          </div>
          <div className="bg-white shadow p-4 rounded">
            <h3 className="text-lg font-semibold">Total Pemesanan</h3>
            <p className="text-2xl">{bookings.length}</p>
          </div>
          <div className="bg-white shadow p-4 rounded">
            <h3 className="text-lg font-semibold">Menunggu Konfirmasi</h3>
            <p className="text-2xl">{jumlahMenunggu}</p>
          </div>
          <div className="bg-white shadow p-4 rounded">
            <h3 className="text-lg font-semibold">Disetujui</h3>
            <p className="text-2xl">{jumlahDisetujui}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
