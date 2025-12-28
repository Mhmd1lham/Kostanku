import React, { useState, useEffect } from "react";
import { useKost } from "../context/KostContext";
import { Link } from "react-router-dom";
import {
  HiOutlineLocationMarker,
  HiOutlineCurrencyDollar,
} from "react-icons/hi";

function Daftarkost() {
  const { kostList } = useKost();

  // Filter state
  const [hargaMin, setHargaMin] = useState("");
  const [hargaMax, setHargaMax] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [selectedFasilitas, setSelectedFasilitas] = useState([]);
  const [filteredKostList, setFilteredKostList] = useState([]);

  const [showFilter, setShowFilter] = useState(false);
  const [radius, setRadius] = useState("all");
  const [userLocation, setUserLocation] = useState(null);

  const allFasilitas = [
    "AC",
    "Kamar Mandi Dalam",
    "WiFi",
    "Dapur Bersama",
    "Parkiran",
  ];

  // ========================
  // Ambil lokasi user (sekali)
  // ========================
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation([
          pos.coords.latitude,
          pos.coords.longitude,
        ]);
      },
      () => {
        setUserLocation(null);
      }
    );
  }, []);

  // ========================
  // Hitung jarak (km)
  // ========================
  const getDistanceKm = (lat1, lon1, lat2, lon2) => {
    const toRad = (x) => (x * Math.PI) / 180;
    const R = 6371;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  // ========================
  // Filter kost
  // ========================
  useEffect(() => {
    let temp = [...kostList];

    // Filter jarak
    if (radius !== "all" && userLocation) {
      temp = temp.filter((kost) => {
        if (!kost.latitude || !kost.longitude) return false;

        const distance = getDistanceKm(
          userLocation[0],
          userLocation[1],
          Number(kost.latitude),
          Number(kost.longitude)
        );

        return distance <= Number(radius);
      });
    }

    // Filter harga
    if (hargaMin) temp = temp.filter(k => k.harga >= Number(hargaMin));
    if (hargaMax) temp = temp.filter(k => k.harga <= Number(hargaMax));

    // Filter lokasi
    if (lokasi) {
      temp = temp.filter(k =>
        k.lokasi.toLowerCase().includes(lokasi.toLowerCase())
      );
    }

    // Filter fasilitas
    if (selectedFasilitas.length > 0) {
      temp = temp.filter(k =>
        selectedFasilitas.every(f =>
          k.fasilitas?.includes(f)
        )
      );
    }

    setFilteredKostList(temp);
  }, [
    kostList,
    hargaMin,
    hargaMax,
    lokasi,
    selectedFasilitas,
    radius,
    userLocation,
  ]);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6">
        Daftar Kost
      </h2>

      {/* Filter */}
      <button
        onClick={() => setShowFilter(!showFilter)}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        {showFilter ? "Sembunyikan Filter" : "Tampilkan Filter"}
      </button>

      {showFilter && (
        <div className="bg-white shadow rounded p-4 space-y-4 mb-6">
          <div className="flex gap-4">
            <input
              type="number"
              placeholder="Harga Min"
              value={hargaMin}
              onChange={(e) => setHargaMin(e.target.value)}
              className="w-1/2 border rounded p-2"
            />
            <input
              type="number"
              placeholder="Harga Max"
              value={hargaMax}
              onChange={(e) => setHargaMax(e.target.value)}
              className="w-1/2 border rounded p-2"
            />
          </div>

          <input
            type="text"
            placeholder="Lokasi"
            value={lokasi}
            onChange={(e) => setLokasi(e.target.value)}
            className="w-full border rounded p-2"
          />

          <div className="flex gap-4 flex-wrap">
            {allFasilitas.map((f) => (
              <label key={f} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedFasilitas.includes(f)}
                  onChange={() =>
                    setSelectedFasilitas((prev) =>
                      prev.includes(f)
                        ? prev.filter((x) => x !== f)
                        : [...prev, f]
                    )
                  }
                />
                {f}
              </label>
            ))}
          </div>

          <select
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="all">Semua Jarak</option>
            <option value="3">≤ 3 km</option>
            <option value="5">≤ 5 km</option>
            <option value="10">≤ 10 km</option>
          </select>

          <button
            onClick={() => {
              setHargaMin("");
              setHargaMax("");
              setLokasi("");
              setSelectedFasilitas([]);
              setRadius("all");
            }}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Reset Filter
          </button>
        </div>
      )}

      {/* List Kost */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredKostList.length > 0 ? (
          filteredKostList.map((kost) => (
            <div key={kost.id} className="bg-white rounded shadow">
              <img
                src={kost.foto?.[0]}
                alt={kost.nama}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg">
                  {kost.nama}
                </h3>

                <p className="flex items-center text-sm text-gray-500 mt-1">
                  <HiOutlineLocationMarker className="mr-1" />
                  {kost.lokasi}
                </p>

                <p className="flex items-center mt-2 font-semibold">
                  <HiOutlineCurrencyDollar className="mr-1" />
                  Rp {kost.harga.toLocaleString()}
                </p>

                <Link
                  to={`/kost/${kost.id}`}
                  className="text-blue-600 text-sm mt-3 inline-block"
                >
                  Lihat Detail
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">
            Tidak ada kost sesuai filter
          </p>
        )}
      </div>
    </div>
  );
}

export default Daftarkost;
