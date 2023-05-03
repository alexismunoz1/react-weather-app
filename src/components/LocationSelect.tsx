import { useState, useEffect } from "react";
import { NativeSelect } from "@mantine/core";
import { FiMapPin } from "react-icons/fi";
import { useLocationStore } from "../store/locationStore";

export const LocationSelect = () => {
  const { setCityName } = useLocationStore();
  const [value, setValue] = useState("Buenos Aires");

  useEffect(() => {
    setCityName(value);
  }, [value]);

  const city_names = ["Buenos Aires", "Tucuman", "Entre Rios", "Mendoza", "Rosario"];

  return (
    <>
      <NativeSelect
        data={city_names}
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        label="Select your city"
        icon={<FiMapPin />}
      />
    </>
  );
};
