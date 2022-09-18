import { gql } from 'graphql-request';

export const QUERY_SITE_SUMMARY = gql`
  query summary {
    summary {
      article
      tag
      comment
      guestbook
      startTime
      reading
    }
  }
`;
