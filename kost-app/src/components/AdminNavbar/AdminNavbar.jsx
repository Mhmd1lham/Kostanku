import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function AdminNavbar() {
  const { logout } = useAuth();

  return (
    <nav className="bg-blue-800 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Admin Panel</h1>
      <div className="space-x-4">
        <Link to="/admin/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <Link to="/admin/kost" className="hover:underline">
          Data Kost
        </Link>
        <Link to="/admin/booking" className="hover:underline">
          Pemesanan
        </Link>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default AdminNavbar;
