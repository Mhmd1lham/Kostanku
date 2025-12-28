import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!form.username.trim()) {
      newErrors.username = "Username wajib diisi";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password wajib diisi";
    }

    // Jika ada error, hentikan proses login
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Reset error
    setErrors({});

    const result = login(form.username, form.password);

    if (result.success) {
      if (result.role === "admin") {
        navigate("/admin");
      } else if (result.role === "pemilik") {
        navigate("/pemilik");
      } else {
        navigate("/");
      }
    } else {
      setErrors({ form: "Username atau password salah" });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        {/* Nama Aplikasi */}
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Kostanku
        </h1>

        {/* Error Umum */}
        {errors.form && (
          <p className="text-red-500 text-sm text-center mb-3">
            {errors.form}
          </p>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Username */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              className={`border p-2 w-full rounded ${
                errors.username ? "border-red-500" : ""
              }`}
              value={form.username}
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">
                {errors.username}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className={`border p-2 w-full rounded ${
                errors.password ? "border-red-500" : ""
              }`}
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
