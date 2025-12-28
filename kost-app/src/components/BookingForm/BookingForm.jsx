import { useState } from "react";
import { useBooking } from "../../context/BookingContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useKost } from "../../context/KostContext";

function BookingForm({ kostId }) {
  const { user } = useAuth();
  const { addBooking } = useBooking();
  const { kostList } = useKost();
  const navigate = useNavigate();

  const kost = kostList.find((k) => k.id === parseInt(kostId));
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const [form, setForm] = useState({
    nama: "",
    nomorTelepon: "",
    jenisKelamin: "",
    asal: "",
    jumlahOrang: 1,
    tanggalMasuk: "",
    durasi: 1,
    catatan: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.nama.trim()) newErrors.nama = "Nama wajib diisi";

    if (!form.nomorTelepon.trim()) {
      newErrors.nomorTelepon = "Nomor telepon wajib diisi";
    } else if (!/^[0-9]+$/.test(form.nomorTelepon)) {
      newErrors.nomorTelepon = "Nomor telepon hanya boleh angka";
    }

    if (!form.jenisKelamin)
      newErrors.jenisKelamin = "Jenis kelamin wajib dipilih";

    if (!form.asal.trim()) newErrors.asal = "Asal / alamat wajib diisi";

    if (!form.tanggalMasuk)
      newErrors.tanggalMasuk = "Tanggal masuk wajib diisi";

    if (!form.jumlahOrang || form.jumlahOrang < 1)
      newErrors.jumlahOrang = "Jumlah orang minimal 1";

    if (!form.durasi || form.durasi < 1)
      newErrors.durasi = "Durasi minimal 1 bulan";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    if (!user) {
      alert("Silakan login terlebih dahulu untuk memesan.");
      return navigate("/login");
    }

    const newBooking = {
      id: Date.now(),
      userId: user.id,
      kostId,
      ...form,
      jumlahOrang: parseInt(form.jumlahOrang),
      durasi: parseInt(form.durasi),
      status: "menunggu",
    };

    addBooking(newBooking);

    setForm({
      nama: "",
      nomorTelepon: "",
      jenisKelamin: "",
      asal: "",
      jumlahOrang: 1,
      tanggalMasuk: "",
      durasi: 1,
      catatan: "",
    });

    setBookingSuccess(true);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mt-10 bg-white rounded-xl shadow-md p-6 md:p-8 max-w-2xl mx-auto space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
          Form Pemesanan Kost
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nama */}
          <div>
            <label className="block font-medium mb-1">Nama Lengkap</label>
            <input
              type="text"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            {errors.nama && (
              <p className="text-red-500 text-sm">{errors.nama}</p>
            )}
          </div>

          {/* Nomor HP */}
          <div>
            <label className="block font-medium mb-1">Nomor Telepon</label>
            <input
              type="tel"
              name="nomorTelepon"
              value={form.nomorTelepon}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            {errors.nomorTelepon && (
              <p className="text-red-500 text-sm">{errors.nomorTelepon}</p>
            )}
          </div>

          {/* Jenis Kelamin */}
          <div>
            <label className="block font-medium mb-1">Jenis Kelamin</label>
            <select
              name="jenisKelamin"
              value={form.jenisKelamin}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Pilih</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
            {errors.jenisKelamin && (
              <p className="text-red-500 text-sm">{errors.jenisKelamin}</p>
            )}
          </div>

          {/* Asal */}
          <div>
            <label className="block font-medium mb-1">Asal / Alamat</label>
            <input
              type="text"
              name="asal"
              value={form.asal}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            {errors.asal && (
              <p className="text-red-500 text-sm">{errors.asal}</p>
            )}
          </div>

          {/* Jumlah Orang */}
          <div>
            <label className="block font-medium mb-1">Jumlah Orang</label>
            <input
              type="number"
              name="jumlahOrang"
              min="1"
              value={form.jumlahOrang}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            {errors.jumlahOrang && (
              <p className="text-red-500 text-sm">{errors.jumlahOrang}</p>
            )}
          </div>

          {/* Tanggal Masuk */}
          <div>
            <label className="block font-medium mb-1">Tanggal Masuk</label>
            <input
              type="date"
              name="tanggalMasuk"
              value={form.tanggalMasuk}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            {errors.tanggalMasuk && (
              <p className="text-red-500 text-sm">{errors.tanggalMasuk}</p>
            )}
          </div>

          {/* Durasi */}
          <div>
            <label className="block font-medium mb-1">
              Lama Tinggal (bulan)
            </label>
            <input
              type="number"
              name="durasi"
              min="1"
              value={form.durasi}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            {errors.durasi && (
              <p className="text-red-500 text-sm">{errors.durasi}</p>
            )}
          </div>
        </div>

        {/* Catatan */}
        <div>
          <label className="block font-medium mb-1">Catatan Tambahan</label>
          <textarea
            name="catatan"
            value={form.catatan}
            onChange={handleChange}
            rows="3"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Kirim Pemesanan
          </button>
        </div>
      </form>

      {bookingSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md text-center max-w-md w-full">
            <h2 className="text-xl font-bold text-green-600 mb-3">
              Pemesanan Berhasil!
            </h2>
            <p className="mb-4 text-gray-700">Silakan hubungi pemilik kost untuk konfirmasi lebih lanjut.</p>
            <a
              href={`https://wa.me/${kost?.nomorPemilik || "6281234567890"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 mb-4"
            >
              Hubungi via WhatsApp
            </a>
            <br />
            <button
              onClick={() => setBookingSuccess(false)}
              className="text-sm text-gray-500 hover:underline"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default BookingForm;
