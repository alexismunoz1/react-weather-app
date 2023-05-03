import { useEffect, useState } from "react";

import { ShowCurrentWeather } from "./components/ShowCurrentWeather";
import { LocationSelect } from "./components/LocationSelect";
import { ShowNextFiveDays } from "./components/ShowNextFiveDays";
import { Header } from "./components/Header";

import { useCurrentWeather } from "./hooks/useCurrentWeather";
import { useNextFiveDays } from "./hooks/useNextFiveDays";
import { GroupedData, groupDataByDay } from "./lib/functions";
import { Container, LoadingOverlay } from "@mantine/core";

function App() {
  const [nextFiveDaysData, setNextFiveDaysData] = useState<GroupedData[]>();
  const { data: currentWeatherData } = useCurrentWeather();
  const { data: nextFiveDays, isLoading } = useNextFiveDays();

  useEffect(() => {
    if (nextFiveDays) {
      const groupedData = groupDataByDay(nextFiveDays.list);
      setNextFiveDaysData(groupedData);
    }
  }, [nextFiveDays]);

  return (
    <Container>
      <LoadingOverlay
        visible={isLoading}
        transitionDuration={250}
        exitTransitionDuration={250}
      />
      <Header />
      {currentWeatherData && <ShowCurrentWeather data={currentWeatherData} />}
      {nextFiveDaysData && <ShowNextFiveDays data={nextFiveDaysData} />}
    </Container>
  );
}

export default App;
