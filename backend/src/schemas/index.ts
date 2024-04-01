import { gql } from 'apollo-server';
import { adressTypes} from './adress.schema';
import { weatherTypes } from './weather.schema';
import { photoTypes } from './photo.shema';

export const typeDefs = [ gql`
  type Query {
    getWeather(lat: Float!, lon: Float!): WeatherResponse
    getAddressByQuery(query: String!): [Address]!
    getAddressByCoords(lat: Float!, lon: Float!) : Address!
    getPhotosByLocation(lat: Float!, lon: Float!): [Photo]
  }


`, weatherTypes, adressTypes, photoTypes]