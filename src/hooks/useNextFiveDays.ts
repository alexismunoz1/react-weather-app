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

export interface NextForecastDaysListResponse {
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
  const [_, city_name] = ctx.queryKey;
  if (!city_name) return null;

  const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
  const url = `forecast?q=${city_name}&lang=es&appid=${apiKey}&units=metric`;
  const { data } = await openWeatherApi.get<NextForecastDaysListResponse>(url);

  return data;
};

export const useNextFiveDays = () => {
  const { city_name } = useLocationStore((state) => ({
    city_name: state.city_name,
  }));

  const queryKey = ["nextFiveDays", city_name];
  const fetcher = fetchNextFiveDays;
  return useQuery(queryKey, fetcher);
};
