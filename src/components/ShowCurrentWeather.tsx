import { ForecastType } from "../hooks/useCurrentWeather";

interface CurrentWeatherProps {
  data: ForecastType;
}
export const ShowCurrentWeather = ({ data }: CurrentWeatherProps) => {
  return (
    <>
      <h1>Current Weather</h1>
      <p>{data.name}</p>
      <p>{data.weather[0].description}</p>
      <p>{data.main.temp}</p>
      <p>{data.main.humidity}</p>
    </>
  );
};
