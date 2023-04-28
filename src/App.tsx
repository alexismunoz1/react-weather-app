import { useEffect } from "react";
import { useCoordsStore } from "./store/coordsStore";
import { shallow } from "zustand/shallow";
import { useCurrentWeather } from "./hooks/useCurrentWeather";

function App() {
  const { data, isLoading } = useCurrentWeather(-36.233373, -61.1139126);

  console.log({ data });

  const { lat, lng } = useCoordsStore(
    (state) => ({
      lat: state.lat,
      lng: state.lng,
    }),
    shallow
  );

  const { setCoords } = useCoordsStore();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoords(position.coords.latitude, position.coords.longitude);
      });
    }
  }, [setCoords]);
  return (
    <>
      <h1>Latitude: {lat}</h1>
      <h1>Longitude: {lng}</h1>
      {isLoading && <h1>Loading...</h1>}
    </>
  );
}

export default App;
