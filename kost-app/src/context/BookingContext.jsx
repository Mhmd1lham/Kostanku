import { createContext, useContext, useEffect, useState } from "react";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState(() => {
    const stored = localStorage.getItem("bookings");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [bookings]);

  const addBooking = (booking) => {
    setBookings((prev) => [...prev, booking]);
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, setBookings }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
