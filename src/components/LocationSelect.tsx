import { useState, useEffect } from "react";
import { NativeSelect } from "@mantine/core";
import { useLocationStore } from "../store/locationStore";

export const LocationSelect = () => {
  const { setCityName, setCoords } = useLocationStore();
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
        style={{ maxWidth: "500px", margin: "auto" }}
        data={city_names}
        onChange={(event) => setCityNameValue(event.currentTarget.value)}
        size="lg"
        value={cityNameValue}
      />
    </div>
  );
};
