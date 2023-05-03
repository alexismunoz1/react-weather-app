import { useState, useEffect } from "react";
import { NativeSelect } from "@mantine/core";
import { FiMapPin } from "react-icons/fi";
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
    <>
      <NativeSelect
        data={city_names}
        value={cityNameValue}
        onChange={(event) => setCityNameValue(event.currentTarget.value)}
        label="Select your city"
        icon={<FiMapPin />}
      />
    </>
  );
};
