import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useBooking } from "../../context/BookingContext";
import { useEffect, useState } from "react";

function Navbar() {
  const { user, logout } = useAuth();
  const { bookings } = useBooking();
  const [scrolled, setScrolled] = useState(false);

  // Tentukan link home sesuai role
  const homeLink =
    user?.role === "admin"
      ? "/admin"
      : user?.role === "pemilik"
      ? "/pemilik"
      : "/";

  // Hitung pemesanan tertunda (khusus user)
  const pendingCount =
    user?.role === "user"
      ? bookings.filter(
          (b) => b.userId === user.id && b.status === "menunggu"
        ).length
      : 0;

  // Deteksi scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300
        ${scrolled ? "bg-blue-600 shadow-lg py-2" : "bg-blue-600 py-4"}
      `}
    >
      <nav className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to={homeLink} className="text-white text-xl font-bold">
          Kostanku
        </Link>

        <div className="space-x-4 flex items-center">
          {/* Link Beranda */}
          {user && (
            <Link to={homeLink} className="text-white hover:underline">
              Beranda
            </Link>
          )}

          {/* Menu User */}
          {user?.role === "user" && (
            <>
              <Link to="/kost" className="text-white hover:underline">
                Daftar Kost
              </Link>
              <Link
                to="/status-pemesanan"
                className="relative text-white hover:underline"
              >
                Status
                {pendingCount > 0 && (
                  <span className="absolute -top-2 -right-4 bg-red-500 text-xs text-white rounded-full px-2">
                    {pendingCount}
                  </span>
                )}
              </Link>
            </>
          )}
          {/* Login / Logout */}
          {user ? (
            <button
              onClick={logout}
              className="text-yellow-300 font-medium hover:underline ml-2"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="text-yellow-300 font-medium hover:underline"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
