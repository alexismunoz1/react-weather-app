import { openWeatherApi } from "../api/openWeather";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { CurrentWeatherByCoords } from "./types";
import { useCoordsStore } from "../store/coordsStore";
import { shallow } from "zustand/shallow";

const fetchCurrentWeather = async (ctx: QueryFunctionContext) => {
  const [_, lat, lng] = ctx.queryKey;
  const api_key = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

  const { data } = await openWeatherApi.get<CurrentWeatherByCoords>(
    `weather?lang=es&lat=${lat}&lon=${lng}&appid=${api_key}&units=metric`
  );
  return data;
};

export const useCurrentWeather = () => {
  const { lat, lng } = useCoordsStore(
    (state) => ({
      lat: state.lat,
      lng: state.lng,
    }),
    shallow
  );

  const queryKey = ["currentWeather", lat, lng];
  const fetcher = fetchCurrentWeather;

  return useQuery(queryKey, fetcher);
};
