import { Card, Text } from "@mantine/core";
import { WeatherIcon } from "./WeatherIcon";

interface CardProps {
  dayOfWeek: string;
  maxTemp: string;
  minTemp: string;
  weatherIcon: string;
}

export const NextDaysCard = ({
  dayOfWeek,
  maxTemp,
  minTemp,
  weatherIcon,
}: CardProps) => {
  return (
    <Card shadow="sm" p="xl" style={{ textAlign: "center" }}>
      <Text size="xl" weight={700}>
        {dayOfWeek}
      </Text>
      <Text size="lg">
        {maxTemp} / {minTemp}
      </Text>
      <WeatherIcon icon={weatherIcon} />
    </Card>
  );
};
