import { gql } from 'graphql-request';

export const QUERY_SITE_INFO = gql`
  query siteinfo {
    siteinfo {
      blacklist {
        ip
        email
        keyword
      }
      hotArticles {
        id
        title
        description
        cover
        createAt
      }
      categories {
        id
        name
        path
      }
      tags {
        id
        path
        name
      }
    }
  }
`;
