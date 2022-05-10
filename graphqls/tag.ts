import { gql } from 'graphql-request';

export const QUERY_TAG = gql`
  query findTags {
    tags {
      data {
        path
      }
    }
  }
`;
