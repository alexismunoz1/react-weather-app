export interface ForecastType {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface NextForecastDaysType {
  cod: string;
  message: number;
  cnt: number;
  list: ListDays[];
  city: City;
}

export interface ListDays {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: SysNextDay;
  dt_txt: string;
  rain?: Rain;
}

export interface Coord {
  lon: number;
  lat: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

export interface Clouds {
  all: number;
}

export interface Sys {
  country: string;
  sunrise: number;
  sunset: number;
}

export interface SysNextDay {
  pod: string;
}

export interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface Rain {
  "3h": number;
}
