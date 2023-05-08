import { useState, useEffect } from "react";
import { NativeSelect } from "@mantine/core";
import { useCurrentLocationStore } from "../store/currentLocationStore";

export const LocationSelect = () => {
  const { setCityName, setCoords } = useCurrentLocationStore();
  const [cityNameValue, setCityNameValue] = useState("Buenos Aires");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoords(position.coords.latitude, position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    setCityName(cityNameValue);
    setCoords(null, null);
  }, [cityNameValue, setCityName]);

  const city_names = [
    "Buenos Aires",
    "Rosario",
    "Entre Rios",
    "Mendoza",
    "San Miguel de Tucumán",
  ];

  return (
    <div>
      <NativeSelect
        data={city_names}
        value={cityNameValue}
        onChange={(event) => setCityNameValue(event.currentTarget.value)}
        size="lg"
      />
    </div>
  );
};
