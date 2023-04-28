import { useEffect } from "react";
import { useCoordsStore } from "./store/coordsStore";
import { useCurrentWeather } from "./hooks/useCurrentWeather";
import { useWeatherCurrentLocation } from "./store/weatherCurrentLocation";

function App() {
  const { data, isLoading } = useCurrentWeather();
  const { setCoords } = useCoordsStore();
  const { setCurrentWeather } = useWeatherCurrentLocation();
  const { city, temp, feels_like, description } = useWeatherCurrentLocation(
    (state) => ({
      city: state.city,
      temp: state.temp,
      feels_like: state.feels_like,
      description: state.description,
    })
  );

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoords(position.coords.latitude, position.coords.longitude);
      });
    }
  }, [setCoords]);

  useEffect(() => {
    if (data) {
      setCurrentWeather(
        data.name,
        data.main.temp,
        data.main.feels_like,
        data.weather[0].description
      );
    }
  }, [data]);

  return (
    <>
      {isLoading && <h1>Loading...</h1>}
      <h3>City: {city}</h3>
      <h3>Temp: {temp}</h3>
      <h3>Feels like: {feels_like}</h3>
      <h3>Description: {description}</h3>
    </>
  );
}

export default App;
