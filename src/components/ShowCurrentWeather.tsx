import { ForecastType } from "../hooks/useCurrentWeather";

interface CurrentWeatherProps {
  currentWeatherData: ForecastType;
}
export const ShowCurrentWeather = ({
  currentWeatherData,
}: CurrentWeatherProps) => {
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
