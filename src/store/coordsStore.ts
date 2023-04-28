import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CoordsStore {
  lat: number;
  lng: number;
  setCoords: (lat: number, lng: number) => void;
}

export const useCoordsStore = create(
  persist<CoordsStore>(
    (set) => ({
      lat: 0,
      lng: 0,
      setCoords: (lat: number, lng: number) =>
        set(() => ({
          lat,
          lng,
        })),
    }),
    {
      name: "coords",
    }
  )
);
