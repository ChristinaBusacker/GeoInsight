import { gql } from '@apollo/client';

export const GET_ADRESS_BY_QUERY_QUERY = gql`
query GetAddressByQuery($query: String!) {
  getAddressByQuery(query: $query) {
    address {
      houseNumber
      postcode
      road
      state
      city
      country
    }
    displayName
    lat
    lon
  }
}
`;