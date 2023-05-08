import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { openWeatherApi } from "../api/openWeather";
import { useCurrentLocationStore } from "../store/currentLocationStore";
import { Clouds, Coord, Main, Sys, Weather, Wind } from "../lib/weatherTypes";

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

const fetchCurrentWeather = async (ctx: QueryFunctionContext) => {
  const [_, lat, lng, cityName] = ctx.queryKey;
  const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

  let url: string;

  if (lat && lng) {
    url = `weather?lat=${lat}&lon=${lng}&lang=es&appid=${apiKey}&units=metric`;
  } else if (cityName) {
    url = `weather?q=${cityName}&lang=es&appid=${apiKey}&units=metric`;
  } else {
    throw new Error("Invalid query params");
  }

  const { data } = await openWeatherApi.get<ForecastType>(url);
  return data;
};

export const useCurrentWeather = () => {
  const { lat, lng, city_name } = useCurrentLocationStore((state) => ({
    lat: state.lat,
    lng: state.lng,
    city_name: state.city_name,
  }));

  const queryKey = ["currentWeather", lat, lng, city_name];
  const fetcher = fetchCurrentWeather;
  return useQuery(queryKey, fetcher);
};
