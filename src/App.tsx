import { MantineProvider } from "@mantine/core";
import { ShowCurrentWeather } from "./components/ShowCurrentWeather";
import { LocationSelect } from "./components/LocationSelect";
import { useCurrentWeather } from "./hooks/useCurrentWeather";

function App() {
  const { data: currentWeatherData, isLoading } = useCurrentWeather();
  // const {data: nextFiveDays} = useNextFiveDays(); --> useNextFiveDays hook

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
