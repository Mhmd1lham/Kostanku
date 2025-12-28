import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Beranda from "./pages/Home";
import DaftarKost from "./pages/Daftarkost";
import Kostdetail from "./pages/Kostdetail";
import Login from "./pages/Login";
import AddKostAdmin from "./pages/AddKostAdmin";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/Route/PrivateRoute";
import AdminBookingList from "./pages/AdminBookingList";
import AdminDashboard from "./pages/AdminDashboard";
import AdminKost from "./pages/AdminKost";
import UserBookingStatus from "./pages/UserBookingStatus";
import EditKostAdmin from "./pages/EditKostAdmin";
import PemilikDashboard from "./pages/PemilikDashboard";
import PemilikEditKost from "./pages/PemilikEditKost";
import AddKostPemilik from "./pages/AddKostPemilik";

function App() {
  return (
    <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/"
            element={
                <Beranda />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/kost"
            element={
                <DaftarKost />
            }
          />
          <Route
            path="/kost/:id"
            element={
                <Kostdetail />
            }
          />
          <Route path="/status-pemesanan" element={<UserBookingStatus />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute requiredRole="admin">
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route path="/admin/booking" element={
            <PrivateRoute requiredRole="admin">
              <AdminBookingList />
            </PrivateRoute>} />
          <Route path="/admin/addkost" element={
            <PrivateRoute requiredRole="admin">
              <AddKostAdmin />
            </PrivateRoute>} />
          <Route path="/admin/kost" element={
            <PrivateRoute requiredRole="admin">
              <AdminKost />
            </PrivateRoute>} />
          <Route path="/admin/kost/edit/:id" element={
            <PrivateRoute requiredRole="admin">
              <EditKostAdmin />
            </PrivateRoute>} />
          <Route path="/pemilik" element={
            <PrivateRoute requiredRole="pemilik">
              <PemilikDashboard />
            </PrivateRoute>} />
            <Route path="/pemilik/tambah" element={
              <PrivateRoute allowedRoles={["pemilik"]}>
                <AddKostPemilik />
              </PrivateRoute>} />
          <Route path="/pemilik/edit/:id" element={
            <PrivateRoute requiredRole="pemilik">
            <PemilikEditKost />
            </PrivateRoute>} />          
          <Route path="/tentang" element={<div className="p-10">Tentang Aplikasi Kostanku</div>} />
        </Routes>
        <Footer />
    </AuthProvider>
  );
}

export default App;
