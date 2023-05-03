import { GroupedData } from "../lib/functions";

interface DaysDataProps {
  data: GroupedData[];
}

export const ShowNextFiveDays = ({ data }: DaysDataProps) => {
  return (
    <>
      <h2>Next 5 Days</h2>
      {data.map((day, index) => (
        <div key={index}>
          <h4>{day.dayOfWeek}</h4>
          {day.data.map((weather, index) => (
            <ul key={index}>
              <li>Hour: {weather.hour_of_temp}</li>
              <li>Temp: {weather.temp}</li>
              <li>Feels Like: {weather.feels_like}</li>
              <li>Icon: {weather.weather.icon}</li>
            </ul>
          ))}
        </div>
      ))}
    </>
  );
};
