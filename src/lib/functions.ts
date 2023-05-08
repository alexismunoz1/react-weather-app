import moment from "moment-timezone";
import { NextForecastDaysList } from "../hooks/useNextFiveDays";
import { Main, Weather } from "./weatherTypes";

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

export type GroupedData = {
  dayOfWeek: string;
  data: Array<{
    hour_of_temp: string;
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    weather: Weather;
    pop: number;
    main: Main;
  }>;
};

/**
 * Group forecast data by day of the week
 * @param forecastDays - Array of forecast data to group
 * @returns Array of grouped forecast data
 */
export function groupDataByDay(
  forecastDays: Array<NextForecastDaysList>
): Array<GroupedData> {
  const groupedData: Array<GroupedData> = [];

  forecastDays.forEach((day) => {
    let dayOfWeek = formatDate(day.dt_txt);
    const { today, tomorrow } = getCurrentDay();
    if (dayOfWeek === today) dayOfWeek = "Today";
    if (dayOfWeek === tomorrow) dayOfWeek = "Tomorrow";

    const group = groupedData.find((group) => group.dayOfWeek === dayOfWeek);

    const formattedData = {
      hour_of_temp: formatHour(day.dt_txt),
      temp: day.main.temp,
      feels_like: day.main.feels_like,
      temp_min: day.main.temp_min,
      temp_max: day.main.temp_max,
      weather: day.weather[0],
      pop: day.pop,
      main: day.main,
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

/**
 * Formats a temperature value in Celsius or Fahrenheit based on the given temperature unit.
 * @param {string} tempUnit The unit of temperature to format the temperature value to.
 * @param {number} temp The temperature value to format.
 * @returns {string} The formatted temperature string.
 */
export function formatTemperature(tempUnit: string, temp: number): string {
  const temperature = tempUnit === "c" ? temp : temp * 1.8 + 32;

  return new Intl.NumberFormat("en-US", {
    style: "unit",
    unit: tempUnit === "c" ? "celsius" : "fahrenheit",
  }).format(Math.round(temperature));
}

export const getCurrentDay = () => {
  const WEEK_DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDate = new Date();
  const today = WEEK_DAYS[currentDate.getDay()];
  currentDate.setDate(currentDate.getDate() + 1);
  const tomorrow = WEEK_DAYS[currentDate.getDay()];
  return {
    today,
    tomorrow,
  };
};
