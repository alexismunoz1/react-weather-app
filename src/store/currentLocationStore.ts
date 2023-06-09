import { create } from "zustand";

interface CoordsStore {
  lat: number | null;
  lng: number | null;
  city_name: string;
  setCityName: (city_name: string) => void;
  setCoords: (lat: number | null, lng: number | null) => void;
}

export const useCurrentLocationStore = create<CoordsStore>((set) => ({
  lat: null,
  lng: null,
  city_name: "",
  setCityName: (city_name) => set(() => ({ city_name })),
  setCoords: (lat: number | null, lng: number | null) =>
    set(() => ({ lat, lng })),
}));
