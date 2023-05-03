import { ForecastType } from "../hooks/types";

interface ShowCurrentWeatherProps {
  currentWeatherData: ForecastType;
}
export const ShowCurrentWeather = ({
  currentWeatherData,
}: ShowCurrentWeatherProps) => {
  return (
    <>
      <h1>Current Weather</h1>
      <p>{currentWeatherData.name}</p>
      <p>{currentWeatherData.weather[0].description}</p>
      <p>{currentWeatherData.main.temp}</p>
      <p>{currentWeatherData.main.humidity}</p>
    </>
  );
};
