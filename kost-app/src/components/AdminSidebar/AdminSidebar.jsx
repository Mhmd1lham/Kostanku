import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

function AdminSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className={`bg-blue-800 text-white w-64 min-h-screen p-4 space-y-4 fixed md:relative z-10 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-2">
          <Link to="/admin" className="block hover:bg-blue-600 px-3 py-2 rounded">Dashboard</Link>
          <Link to="/admin/kost" className="block hover:bg-blue-600 px-3 py-2 rounded">Data Kost</Link>
          <Link to="/admin/booking" className="block hover:bg-blue-600 px-3 py-2 rounded">Pemesanan</Link>
          <Link to="/admin/addkost" className="block hover:bg-blue-600 px-3 py-2 rounded">Tambah Kost</Link>
          <button onClick={handleLogout} className="w-full text-left bg-red-600 hover:bg-red-700 px-3 py-2 rounded">Logout</button>
        </nav>
      </div>

      {/* Toggle Button (for mobile) */}
      <button
        className="md:hidden fixed top-4 left-4 z-20 bg-blue-800 text-white px-3 py-2 rounded focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>
    </div>
  );
}

export default AdminSidebar;
