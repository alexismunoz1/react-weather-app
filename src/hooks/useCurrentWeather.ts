import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { openWeatherApi } from "../api/openWeather";
import { useLocationStore } from "../store/locationStore";

export interface ForecastType {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface Coord {
  lon: number;
  lat: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}
export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}
export interface Wind {
  speed: number;
  deg: number;
  gust: number;
}
export interface Clouds {
  all: number;
}
export interface Sys {
  country: string;
  sunrise: number;
  sunset: number;
}

const fetchCurrentWeather = async (ctx: QueryFunctionContext) => {
  const [_, city_name] = ctx.queryKey;
  if (!city_name) return null;

  const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
  const url = `weather?q=${city_name}&lang=es&appid=${apiKey}&units=metric`;
  const { data } = await openWeatherApi.get<ForecastType>(url);

  return data;
};

export const useCurrentWeather = () => {
  const { city_name } = useLocationStore((state) => ({
    city_name: state.city_name,
  }));

  const queryKey = ["currentWeather", city_name];
  const fetcher = fetchCurrentWeather;
  return useQuery(queryKey, fetcher);
};
