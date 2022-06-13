import { gql } from 'graphql-request';

export const QUERY_BLACK_LIST = gql`
  query blacklist {
    blacklist {
      ip
      email
      keyword
    }
  }
`;
