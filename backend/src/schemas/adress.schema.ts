import { gql } from 'apollo-server';

export const adressTypes = gql`
  type Address {
    placeId: String
    licence: String
    osmType: String
    osmId: String
    boundingbox: [String]
    lat: String
    lon: String
    displayName: String
    class: String
    type: String
    importance: Float
    icon: String
    address: AddressDetails
  }
  
  type AddressDetails {
    houseNumber: String
    road: String
    neighbourhood: String
    suburb: String
    city: String
    county: String
    state: String
    postcode: String
    country: String
    countryCode: String
  }
`;