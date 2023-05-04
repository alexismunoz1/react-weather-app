import { formatTemperature } from "../lib/functions";
import { GroupedData } from "../lib/functions";
import { NextDaysCard } from "../ui/NextDaysCard";
import { SimpleGrid, Space, Title } from "@mantine/core";

interface DaysDataProps {
  data: GroupedData[];
}

export const ShowNextFiveDays = ({ data }: DaysDataProps) => {
  // Map each day's max and min temperature
  const maxAndMinTemps = data.map((day) => {
    let maxTemp = -Infinity;
    let minTemp = Infinity;

    // Find the maximum and minimum temperature for each day
    day.data.forEach((main) => {
      if (main.temp_max > maxTemp) {
        maxTemp = main.temp_max;
      }
      if (main.temp_min < minTemp) {
        minTemp = main.temp_min;
      }
    });

    // Return an object with the formatted max and min temperature
    return {
      maxTemp: formatTemperature("c", maxTemp),
      minTemp: formatTemperature("c", minTemp),
    };
  });

  const weatherIcons = data.map((day) => {
    const noonData = day.data.find(
      ({ hour_of_temp }) => hour_of_temp === "12:00"
    );
    return noonData?.weather.icon ?? "";
  });

  return (
    <section>
      <Space h="lg" />
      <Title order={2} align="center" my="lg">
        Forecast for the next 5 days
      </Title>

      <SimpleGrid
        cols={3}
        breakpoints={[
          { maxWidth: 1200, cols: 3, spacing: "lg" },
          { maxWidth: 980, cols: 2, spacing: "md" },
          { maxWidth: 755, cols: 2, spacing: "sm" },
          { maxWidth: 600, cols: 1, spacing: "sm" },
        ]}
      >
        {data.map((day, index) => (
          <NextDaysCard
            dayOfWeek={day.dayOfWeek}
            maxTemp={maxAndMinTemps[index].maxTemp}
            minTemp={maxAndMinTemps[index].minTemp}
            weatherIcon={weatherIcons[index]}
          />
        ))}
      </SimpleGrid>
    </section>
  );
};
