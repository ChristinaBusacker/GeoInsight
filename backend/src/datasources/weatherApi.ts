import { RESTDataSource } from 'apollo-datasource-rest';
import dotenv from 'dotenv'

dotenv.config();

export class WeatherApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.openweathermap.org/data/3.0/';
  }

  async getWeather(lat: number, lon: number) {
    return this.get('onecall', {
        lat,
        lon,
        units: 'metric',
        appid: process.env.OPENWEATHERMAP_API_KEY,
        lang: 'de'
    }); 
  }
}