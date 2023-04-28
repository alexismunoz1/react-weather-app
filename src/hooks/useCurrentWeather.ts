import { openWeatherApi } from "../api/openWeather";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { CurrentWeatherByCoords } from "./types";

const fetchCurrentWeather = async (ctx: QueryFunctionContext) => {
  const [_, lat, lng] = ctx.queryKey;
  const { data } = await openWeatherApi.get<CurrentWeatherByCoords>(
    `weather?lat=${lat}&lon=${lng}&appid=${
      import.meta.env.VITE_OPEN_WEATHER_API_KEY
    }`
  );
  return data;
};

export const useCurrentWeather = (lat: number, lng: number) => {
  return useQuery(["currentWeather", lat, lng], fetchCurrentWeather);
};
