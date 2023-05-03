import { MantineProvider } from "@mantine/core";
import { ShowCurrentWeather } from "./components/ShowCurrentWeather";
import { LocationSelect } from "./components/LocationSelect";

function App() {
  // const {data: currentWeatherData} = useCurrentWeather(); --> useCurrentWeather hook
  // const {data: nextFiveDays} = useNextFiveDays(); --> useNextFiveDays hook

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <LocationSelect />
      <ShowCurrentWeather />
    </MantineProvider>
  );
}
//     <LocationSelect /> --> setCityName("Buenos Aires") por default
//     <ShowCurrentWeather {currentWeatherData: {}} />
//     <ShowNextFiveDays /> {nextFiveDays: []}

export default App;
