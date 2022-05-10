import { gql } from 'graphql-request';

export const QUERY_CATEGORY = gql`
  query findCategories {
    categories {
      id
      name
      path
      description
      count
      sort
      expand
    }
  }
`;
