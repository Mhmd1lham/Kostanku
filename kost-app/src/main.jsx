import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { KostProvider } from "./context/KostContext";
import { BookingProvider } from "./context/BookingContext"; // ✅ tambahkan ini

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <KostProvider>
          <BookingProvider>
            <App />
          </BookingProvider>
        </KostProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
