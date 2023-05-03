import { GroupedData } from "../lib/functions";

interface DaysDataProps {
  DaysData: GroupedData[];
}

export const ShowNextFiveDays = ({ DaysData }: DaysDataProps) => {
  return (
    <>
    <h2>Next 5 Days</h2>
      {DaysData.map((day) => (
        <div key={day.dayOfWeek}>
          <h4>{day.dayOfWeek}</h4>
          {day.data.map((weather) => (
            <ul key={weather.temp}>
              <li>Hour: {weather.hour_of_temp}</li>
              <li>Temp: {weather.temp}</li>
              <li>Feels Like: {weather.feels_like}</li>
            </ul>
          ))}
        </div>
      ))}
    </>
  );
};
