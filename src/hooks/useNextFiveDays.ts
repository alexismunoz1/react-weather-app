import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { openWeatherApi } from "../api/openWeather";
import { useLocationStore } from "../store/locationStore";

export interface NextForecastDaysType {
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

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Clouds {
  all: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

export interface Sys {
  pod: string;
}

export interface Rain {
  "3h": number;
}

const fetchNextFiveDays = async (ctx: QueryFunctionContext) => {
  const [_, city_name] = ctx.queryKey;
  if (!city_name) return null;

  const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
  const url = `forecast?q=${city_name}&lang=es&appid=${apiKey}&units=metric`;
  const { data } = await openWeatherApi.get(url);

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
