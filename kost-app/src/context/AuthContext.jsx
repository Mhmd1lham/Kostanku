import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const DEFAULT_USERS = [
  { id: 1, username: "admin", password: "admin123", role: "admin", name: "Admin" },
  { id: 2, username: "user", password: "user123", role: "user", name: "User Biasa" },
  { id: 101, username: "pemilikA", password: "aaa123", role: "pemilik", name: "Pemilik A" },
  { id: 102, username: "pemilikB", password: "bbb123", role: "pemilik", name: "Pemilik B" },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  // ensure users exist in localStorage (seed)
  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users") || "null");
    if (!savedUsers) {
      localStorage.setItem("users", JSON.stringify(DEFAULT_USERS));
    }
  }, []);

  const login = (username, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const found = users.find((u) => u.username === username && u.password === password);
    if (!found) return { success: false, message: "Username / password salah" };

    // store minimal user (omit password)
    const safeUser = { id: found.id, username: found.username, role: found.role, name: found.name };
    setUser(safeUser);
    localStorage.setItem("user", JSON.stringify(safeUser));
    return { success: true, role: found.role };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // register a new pemilik (optional UI can call this)
  const registerPemilik = ({ username, password, name }) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find((u) => u.username === username)) {
      return { success: false, message: "Username sudah ada" };
    }
    const newUser = {
      id: Date.now(),
      username,
      password,
      role: "pemilik",
      name: name || username,
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    return { success: true, user: newUser };
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, registerPemilik }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
