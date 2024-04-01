import { gql } from 'apollo-server';

export const weatherTypes = gql`
type WeatherResponse {
    lat: Float
    lon: Float
    timezone: String
    timezone_offset: Int
    current: CurrentWeather
    minutely: [MinutelyWeather]
    hourly: [HourlyWeather]
    daily: [DailyWeather]
    alerts: [WeatherAlert]
  }
  
  type CurrentWeather {
    dt: Int
    sunrise: Int
    sunset: Int
    temp: Float
    feels_like: Float
    pressure: Int
    humidity: Int
    dew_point: Float
    uvi: Float
    clouds: Int
    visibility: Int
    wind_speed: Float
    wind_deg: Int
    wind_gust: Float
    weather: [WeatherCondition]
  }
  
  type MinutelyWeather {
    dt: Int
    precipitation: Float
  }
  
  type HourlyWeather {
    dt: Int
    temp: Float
    feels_like: Float
    pressure: Int
    humidity: Int
    dew_point: Float
    uvi: Float
    clouds: Int
    visibility: Int
    wind_speed: Float
    wind_deg: Int
    wind_gust: Float
    weather: [WeatherCondition]
    pop: Float
  }
  
  type DailyWeather {
    dt: Int
    sunrise: Int
    sunset: Int
    moonrise: Int
    moonset: Int
    moon_phase: Float
    summary: String
    temp: Temperature
    feels_like: FeelsLike
    pressure: Int
    humidity: Int
    dew_point: Float
    wind_speed: Float
    wind_deg: Int
    wind_gust: Float
    weather: [WeatherCondition]
    clouds: Int
    pop: Float
    rain: Float
    uvi: Float
  }
  
  type Temperature {
    day: Float
    min: Float
    max: Float
    night: Float
    eve: Float
    morn: Float
  }
  
  type FeelsLike {
    day: Float
    night: Float
    eve: Float
    morn: Float
  }
  
  type WeatherCondition {
    id: Int
    main: String
    description: String
    icon: String
  }
  
  type WeatherAlert {
    sender_name: String
    event: String
    start: Int
    end: Int
    description: String
    tags: [String]
  }
`;