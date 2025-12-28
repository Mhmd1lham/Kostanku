import { useBooking } from "../context/BookingContext";
import { useAuth } from "../context/AuthContext";
import { useKost } from "../context/KostContext";
import { FaCheckCircle, FaTimesCircle, FaHourglassHalf } from "react-icons/fa";


function UserBookingStatus() {
  const { user } = useAuth();
  const { bookings } = useBooking();
  const { kostList } = useKost();

  const myBookings = bookings.filter((b) => b.userId === user?.id);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Status Pemesanan Kost</h2>

      {myBookings.length === 0 ? (
        <p>Kamu belum memesan kost.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Nama Kost</th>
                <th className="p-2 border">Tanggal Masuk</th>
                <th className="p-2 border">Durasi</th>
                <th className="p-2 border">Catatan</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {myBookings.map((b) => {
                const kost = kostList.find((k) => k.id === b.kostId);
                return (
                  <tr key={b.id}>
                    <td className="p-2 border">{kost?.nama}</td>
                    <td className="p-2 border">{b.tanggalMasuk}</td>
                    <td className="p-2 border">{b.durasi} bulan</td>
                    <td className="p-2 border">{b.catatan}</td>
                    <td className="p-2 border font-medium flex items-center gap-2">
                    {b.status === "disetujui" && (
                        <>
                        <FaCheckCircle className="text-green-500" /> <span className="capitalize">Disetujui</span>
                        </>
                    )}
                    {b.status === "ditolak" && (
                        <>
                        <FaTimesCircle className="text-red-500" /> <span className="capitalize">Ditolak</span>
                        </>
                    )}
                    {b.status === "menunggu" && (
                        <>
                        <FaHourglassHalf className="text-yellow-500" /> <span className="capitalize">Menunggu</span>
                        </>
                    )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserBookingStatus;
