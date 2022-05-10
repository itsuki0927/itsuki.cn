import { gql } from 'graphql-request';

export const QUERY_CATEGORY = gql`
  query findCategories {
    categories {
      id
      path
    }
  }
`;
