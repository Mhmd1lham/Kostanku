// utils/storage.js

const KOST_KEY = "data_kost";

export const getKostList = () => {
  return JSON.parse(localStorage.getItem(KOST_KEY)) || [];
};

export const saveKostList = (data) => {
  localStorage.setItem(KOST_KEY, JSON.stringify(data));
};

export const addKost = (kost) => {
  const data = getKostList();
  data.push(kost);
  saveKostList(data);
};
