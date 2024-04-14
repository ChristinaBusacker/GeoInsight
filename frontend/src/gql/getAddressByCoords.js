import { gql } from '@apollo/client';

export const GET_ADRESS_BY_COORDS_QUERY = gql`
query GetAddressByCoords($lat: Float!, $lon: Float!) {
  getAddressByCoords(lat: $lat, lon: $lon) {
    address {
      city
      country
      countryCode
      county
      houseNumber
      postcode
      state
      road
    }
    displayName
  }
}
`;