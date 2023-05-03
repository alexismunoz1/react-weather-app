import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { openWeatherApi } from "../api/openWeather";
import { useLocationStore } from "../store/locationStore";
import { ForecastType } from "./types";

const fetchCurrentWeather = async (ctx: QueryFunctionContext) => {
  const [_, city_name] = ctx.queryKey;
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
