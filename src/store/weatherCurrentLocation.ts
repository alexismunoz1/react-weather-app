import { create } from "zustand";

interface CoordsStore {
  city: string;
  temp: number;
  feels_like: number;
  description: string;
  setCurrentWeather: (
    city: string,
    temp: number,
    feels_like: number,
    description: string
  ) => void;
}

export const useWeatherCurrentLocation = create<CoordsStore>((set) => ({
  city: "",
  temp: 0,
  feels_like: 0,
  description: "",
  setCurrentWeather: (
    city: string,
    temp: number,
    feels_like: number,
    description: string
  ) =>
    set(() => ({
      city,
      temp,
      feels_like,
      description,
    })),
}));
