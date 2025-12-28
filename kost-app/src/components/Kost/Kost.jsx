import { Link } from "react-router-dom";

function Kost({ kost }) {
  return (
    <Link to={`/kost/${kost.id}`}>
      <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition">
        <img src={kost.gambar} alt={kost.nama} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="text-xl font-semibold">{kost.nama}</h3>
          <p className="text-sm text-gray-600">{kost.alamat}</p>
          <p className="text-blue-500 font-bold mt-2">Rp {kost.harga} / bulan</p>
        </div>
      </div>
    </Link>
  );
}

export default Kost;
