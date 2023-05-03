import { ForecastType } from "../hooks/useCurrentWeather";
import { createStyles, Group, Stack, Text } from "@mantine/core";
import { formatTemperature } from "../lib/functions";

const useStyles = createStyles(() => ({
  description: {
    fontSize: "2rem",
    fontWeight: 700,
    lineHeight: 1,
    margin: 0,
    textAlign: "center",
    textTransform: "capitalize",
  },
  bigTemp: {
    fontSize: "8rem",
    fontWeight: 700,
    lineHeight: 1,
    margin: 0,
    textAlign: "center",
  },
  feelsLike: {
    fontSize: "2rem",
    fontWeight: 700,
    lineHeight: 1,
    margin: 0,
    textAlign: "center",
  },
}));

interface CurrentWeatherProps {
  data: ForecastType;
}
export const ShowCurrentWeather = ({ data }: CurrentWeatherProps) => {
  const { classes } = useStyles();
  const currentWeatherDescription = data.weather[0].description;
  const currentTemperature = formatTemperature("c", data.main.temp);
  const feelsLikeTemperature = formatTemperature("c", data.main.feels_like);

  return (
    <>
      <Group position="center">
        <Stack>
          <Text
            className={classes.description}
            component="p"
            gradient={{ from: "indigo", to: "cyan", deg: 45 }}
            variant="gradient"
          >
            {currentWeatherDescription}
          </Text>
          <Text
            className={classes.bigTemp}
            component="p"
            gradient={{ from: "indigo", to: "cyan", deg: 45 }}
            variant="gradient"
          >
            {currentTemperature}
          </Text>
          {data.main.feels_like > data.main.temp && (
            <Text
              className={classes.feelsLike}
              component="p"
              gradient={{ from: "yellow", to: "orange", deg: 45 }}
              variant="gradient"
            >
              Feels Like: {feelsLikeTemperature}
            </Text>
          )}
        </Stack>
      </Group>
    </>
  );
};
