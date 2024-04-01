import { gql } from 'apollo-server';

export const photoTypes = gql`
    type Photo {
        id: String
        owner: String
        secret: String
        url: String
        server: String
        farm: Int
        title: String
        ispublic: Int
        isfriend: Int
        isfamily: Int
    }
`;