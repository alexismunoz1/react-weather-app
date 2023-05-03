import { MantineProvider } from "@mantine/core";
import { ShowCurrentWeather } from "./components/ShowCurrentWeather";
import { LocationSelect } from "./components/LocationSelect";
import { useCurrentWeather } from "./hooks/useCurrentWeather";
import { useNextFiveDays } from "./hooks/useNextFiveDays";

import { groupDataByDay } from "./lib/functions";

function App() {
  const { data: currentWeatherData, isLoading } = useCurrentWeather();
  const { data: nextFiveDays } = useNextFiveDays();

  if (nextFiveDays) {
    const days = groupDataByDay(nextFiveDays?.list);
    console.log(days);
  }

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <LocationSelect />
      {!isLoading && currentWeatherData && (
        <ShowCurrentWeather currentWeatherData={currentWeatherData} />
      )}
    </MantineProvider>
  );
}
//     <ShowNextFiveDays /> {nextFiveDays: []}

export default App;
