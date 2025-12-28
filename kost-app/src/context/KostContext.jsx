import { createContext, useContext, useEffect, useState } from "react";

const KostContext = createContext();

export const KostProvider = ({ children }) => {
  const [kostList, setKostList] = useState(() => {
    const saved = localStorage.getItem("kostList");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("kostList", JSON.stringify(kostList));
  }, [kostList]);

  const addKost = (kost) => {
    // ensure id numeric
    const newKost = { ...kost, id: Number(kost.id ?? Date.now()) };
    setKostList((prev) => [...prev, newKost]);
  };

  const updateKost = (id, updatedData) => {
    setKostList((prev) => prev.map((k) => (Number(k.id) === Number(id) ? { ...k, ...updatedData } : k)));
  };

  const removeKost = (id) => {
    setKostList((prev) => prev.filter((k) => Number(k.id) !== Number(id)));
  };

  const getKostById = (id) => {
    return kostList.find((k) => Number(k.id) === Number(id));
  };

  return (
    <KostContext.Provider value={{ kostList, addKost, updateKost, removeKost, getKostById }}>
      {children}
    </KostContext.Provider>
  );
};

export const useKost = () => useContext(KostContext);
