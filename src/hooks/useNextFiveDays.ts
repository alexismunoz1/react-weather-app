import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { openWeatherApi } from "../api/openWeather";
import { useLocationStore } from "../store/locationStore";
import {
  City,
  Clouds,
  Main,
  Rain,
  Sys,
  Weather,
  Wind,
} from "../lib/weatherTypes";

export interface NextForecastDays {
  cod: string;
  message: number;
  cnt: number;
  list: NextForecastDaysList[];
  city: City;
}

export interface NextForecastDaysList {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: Sys;
  dt_txt: string;
  rain?: Rain;
}

const fetchNextFiveDays = async (ctx: QueryFunctionContext) => {
  const [, lat, lng, cityName] = ctx.queryKey;
  const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

  let url: string;
  if (lat && lng) {
    url = `forecast?lat=${lat}&lon=${lng}&lang=es&appid=${apiKey}&units=metric`;
  } else if (cityName) {
    url = `forecast?q=${cityName}&lang=es&appid=${apiKey}&units=metric`;
  } else {
    throw new Error("Invalid query params");
  }

  const { data } = await openWeatherApi.get<NextForecastDays>(url);

  return data;
};

export const useNextFiveDays = () => {
  const { lat, lng, city_name } = useLocationStore((state) => ({
    lat: state.lat,
    lng: state.lng,
    city_name: state.city_name,
  }));

  const queryKey = ["nextFiveDays", lat, lng, city_name];
  const fetcher = fetchNextFiveDays;
  return useQuery(queryKey, fetcher);
};
