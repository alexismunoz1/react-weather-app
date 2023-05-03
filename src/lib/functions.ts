import moment from "moment-timezone";
import { NextForecastDaysType } from "../hooks/useNextFiveDays";

/**
 * Formats a given date string in the format "YYYY-MM-DD HH:mm:ss"
 * to the corresponding day of the week in Spanish.
 *
 * @param {string} dateText The date string to format.
 * @returns {string} The day of the week in Spanish.
 */
function formatDate(dateText: string): string {
  moment.locale("es");
  const date = moment.tz(dateText, "America/Argentina/Buenos_Aires");
  return date.format("dddd");
}

/**
 * Takes in a string representing a date and extracts the hour from it.
 *
 * @param {string} dateText - The date string to extract the hour from.
 * @returns {string} The formatted hour string.
 */
function formatHour(dateText: string): string {
  const timeString = dateText.split(" ")[1]; // obtiene la hora
  const hour = timeString.split(":")[0];

  return `${hour}:00`;
}

type GroupedData = {
  dayOfWeek: string;
  data: Array<{
    hour_of_temp: string;
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    };
  }>;
};

/**
 * Group forecast data by day of the week
 * @param forecastDays - Array of forecast data to group
 * @returns Array of grouped forecast data
 */
export function groupDataByDay(
  forecastDays: Array<NextForecastDaysType>
): Array<GroupedData> {
  const groupedData: Array<GroupedData> = [];

  forecastDays.forEach((day) => {
    const dayOfWeek = formatDate(day.dt_txt);

    const group = groupedData.find((g) => g.dayOfWeek === dayOfWeek);

    const formattedData = {
      hour_of_temp: formatHour(day.dt_txt),
      temp: day.main.temp,
      feels_like: day.main.feels_like,
      temp_min: day.main.temp_min,
      temp_max: day.main.temp_max,
      weather: day.weather[0],
    };

    if (group) {
      group.data.push(formattedData);
    } else {
      groupedData.push({
        dayOfWeek: dayOfWeek,
        data: [formattedData],
      });
    }
  });

  return groupedData;
}
