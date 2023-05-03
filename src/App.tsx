import { useEffect, useState } from "react";
import { MantineProvider } from "@mantine/core";

import { ShowCurrentWeather } from "./components/ShowCurrentWeather";
import { LocationSelect } from "./components/LocationSelect";
import { ShowNextFiveDays } from "./components/ShowNextFiveDays";

import { useCurrentWeather } from "./hooks/useCurrentWeather";
import { useNextFiveDays } from "./hooks/useNextFiveDays";
import { GroupedData, groupDataByDay } from "./lib/functions";

function App() {
  const [nextFiveDaysData, setNextFiveDaysData] = useState<GroupedData[]>();
  const { data: currentWeatherData } = useCurrentWeather();
  const { data: nextFiveDays } = useNextFiveDays();

  useEffect(() => {
    if (nextFiveDays) {
      const groupedData = groupDataByDay(nextFiveDays.list);
      setNextFiveDaysData(groupedData);
    }
  }, [nextFiveDays]);

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <LocationSelect />
      {currentWeatherData && <ShowCurrentWeather data={currentWeatherData} />}
      {nextFiveDaysData && <ShowNextFiveDays data={nextFiveDaysData} />}
    </MantineProvider>
  );
}

export default App;
