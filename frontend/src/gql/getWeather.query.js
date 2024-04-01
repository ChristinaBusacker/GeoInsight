import { gql } from '@apollo/client';

export const GET_WEATHER_QUERY = gql`
query getWeather($lat: Float!, $lon: Float!) {
  getWeather(lat: $lat, lon: $lon) {
    current {
      clouds
      dew_point
      dt
      humidity
      feels_like
      pressure
      sunset
      sunrise
      temp
      uvi
      visibility
      weather {
        description
        icon
        id
        main
      }
      wind_deg
      wind_gust
      wind_speed
    }
    daily {
      clouds
      dew_point
      humidity
      pressure
      temp {
        max
        min
      }
      wind_speed
      uvi
      sunset
      sunrise
    }
    timezone
  }
}

`;