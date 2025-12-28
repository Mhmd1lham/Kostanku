import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { useKost } from "../context/KostContext";

function Home() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const { kostList } = useKost();

  return (
    <div className="text-gray-800">
      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[45vh] md:h-[50vh] flex items-center justify-center text-white px-6">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 z-0"></div>

        {/* Background Image */}
        <img
          src="/images/hero.jpg"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover z-[-1] opacity-40 blur-[1px]"
        />

        {/* Content */}
        <div className="relative z-10 text-center max-w-2xl">
          <h1
            className="text-3xl md:text-4xl font-bold mb-4"
            data-aos="fade-down"
          >
            Temukan Kost Idamanmu
          </h1>

          <p
            className="text-md md:text-lg text-gray-100 mb-6"
            data-aos="fade-up"
          >
            Jelajahi dan pesan kost dengan mudah, cepat, dan aman.
          </p>

          <Link
            to="/kost"
            className="bg-white text-blue-700 px-6 py-2 rounded shadow font-semibold hover:bg-gray-100 transition"
            data-aos="zoom-in"
          >
            Lihat Kost Sekarang
          </Link>
        </div>
      </section>

      {/* ================= STATISTIK ================= */}
      <section className="bg-white py-10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div data-aos="fade-up">
            <h3 className="text-2xl font-bold text-blue-600">
              {kostList.length}+
            </h3>
            <p className="text-gray-500 text-sm">Kost Terdaftar</p>
          </div>
          <div data-aos="fade-up" data-aos-delay="100">
            <h3 className="text-2xl font-bold text-blue-600">Cepat</h3>
            <p className="text-gray-500 text-sm">Pencarian</p>
          </div>
          <div data-aos="fade-up" data-aos-delay="200">
            <h3 className="text-2xl font-bold text-blue-600">Aman</h3>
            <p className="text-gray-500 text-sm">Transaksi</p>
          </div>
          <div data-aos="fade-up" data-aos-delay="300">
            <h3 className="text-2xl font-bold text-blue-600">Mudah</h3>
            <p className="text-gray-500 text-sm">Digunakan</p>
          </div>
        </div>
      </section>

      {/* ================= KOST PILIHAN ================= */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2
            className="text-3xl font-bold text-center mb-10"
            data-aos="fade-up"
          >
            Kost Pilihan
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {kostList.slice(0, 6).map((kost, index) => (
              <div
                key={kost.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-white shadow rounded overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <img
                  src={kost.foto?.[0]}
                  alt={kost.nama}
                  className="h-48 w-full object-cover"
                />

                <div className="p-4">
                  <h3 className="text-lg font-semibold truncate">
                    {kost.nama}
                  </h3>
                  <p className="text-sm text-gray-500">{kost.lokasi}</p>
                  <p className="text-green-600 font-bold mt-1">
                    Rp {kost.harga?.toLocaleString()}
                  </p>

                  <Link
                    to={`/kost/${kost.id}`}
                    className="text-blue-600 hover:underline text-sm mt-2 inline-block"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/kost"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
            >
              Lihat Semua Kost
            </Link>
          </div>
        </div>
      </section>

      {/* ================= KEUNGGULAN ================= */}
      <section className="py-20 bg-gray-100">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold" data-aos="fade-up">
            Kenapa Memilih Kostanku?
          </h2>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">
          <div className="text-center" data-aos="fade-up">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1161/1161388.png"
              alt="Cepat"
              className="mx-auto w-20 mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Pencarian Cepat</h3>
            <p>Cari kost dengan filter lengkap dan mudah digunakan.</p>
          </div>

          <div
            className="text-center"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/929/929426.png"
              alt="Aman"
              className="mx-auto w-20 mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Transaksi Aman</h3>
            <p>Langsung terhubung dengan pemilik kost.</p>
          </div>

          <div
            className="text-center"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/565/565547.png"
              alt="Mudah"
              className="mx-auto w-20 mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Mudah Digunakan</h3>
            <p>Antarmuka sederhana dan ramah pengguna.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
