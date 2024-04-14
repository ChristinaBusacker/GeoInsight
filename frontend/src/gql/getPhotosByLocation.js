import { gql } from '@apollo/client';

export const GET_PHOTOS_BY_LOCATION_QUERY = gql`
query GetPhotosByLocation($lat: Float!, $lon: Float!) {
  getPhotosByLocation(lat: $lat, lon: $lon) {
    url
  }
}
`;