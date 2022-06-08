import { gql } from 'graphql-request';

export const QUERY_SITE_INFO = gql`
  query siteinfo {
    siteinfo {
      blacklist {
        ip
        email
        keyword
      }
      bannerArticles {
        id
        title
        cover
        createAt
        description
        author
        tags {
          name
        }
      }
      hotArticles {
        id
        title
        description
        cover
        createAt
      }
      tags {
        id
        path
        name
        count
        expand
        description
      }
    }
  }
`;
