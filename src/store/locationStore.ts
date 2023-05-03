import { create } from "zustand";

interface CoordsStore {
  lat: number | null;
  lng: number | null;
  city_name: string;
  setCityName: (city_name: string) => void;
  setCoords: (lat: number, lng: number) => void;
}

export const useLocationStore = create<CoordsStore>((set) => ({
  lat: null,
  lng: null,
  city_name: "",
  setCityName: (city_name) => set(() => ({ city_name })),
  setCoords: (lat: number, lng: number) => set(() => ({ lat, lng })),
}));
