import { gql } from 'graphql-request';

export const QUERY_TAGS = gql`
  query findTags {
    tags {
      data {
        id
        createAt
        updateAt
        name
        path
        description
        count
        sort
        expand
      }
    }
  }
`;

export const QUERY_TAG_PATHS = gql`
  query findTagPaths {
    tags {
      data {
        path
      }
    }
  }
`;
