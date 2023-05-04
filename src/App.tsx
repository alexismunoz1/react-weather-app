import { useEffect, useState } from "react";

import { Layout } from "./components/Layout";
import { LocationSelect } from "./components/LocationSelect";
import { ShowCurrentWeather } from "./components/ShowCurrentWeather";
import { ShowNextForecastDays } from "./components/ShowNextForecastDays";

import { useCurrentWeather } from "./hooks/useCurrentWeather";
import { useNextFiveDays } from "./hooks/useNextFiveDays";
import { GroupedData, groupDataByDay } from "./lib/functions";
import { Container, LoadingOverlay } from "@mantine/core";

function App() {
  const [nextFiveDaysData, setNextFiveDaysData] = useState<GroupedData[]>();
  const { data: currentWeatherData, isLoading: isLoadingCurrentWeather } =
    useCurrentWeather();
  const { data: nextFiveDays, isLoading: isLoadingNextFiveDays } =
    useNextFiveDays();

  useEffect(() => {
    if (nextFiveDays) {
      const groupedData = groupDataByDay(nextFiveDays.list);
      setNextFiveDaysData(groupedData);
    }
  }, [nextFiveDays]);

  return (
    <Container>
      <Layout>
        <LocationSelect />
        {currentWeatherData ? (
          <ShowCurrentWeather data={currentWeatherData} />
        ) : (
          <LoadingOverlay
            visible={isLoadingCurrentWeather}
            transitionDuration={250}
            exitTransitionDuration={250}
          />
        )}
        {nextFiveDaysData ? (
          <ShowNextForecastDays data={nextFiveDaysData} />
        ) : (
          <LoadingOverlay
            visible={isLoadingNextFiveDays}
            transitionDuration={250}
            exitTransitionDuration={250}
          />
        )}
      </Layout>
    </Container>
  );
}

export default App;
