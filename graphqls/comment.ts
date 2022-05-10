import { gql } from 'graphql-request';

export const QUERY_COMMENTS = gql`
  query findComments($search: CommentSearchRequest!) {
    comments(search: $search) {
      total
      data {
        id
        createAt
        updateAt
        nickname
        email
        website
        content
        liking
        ip
        agent
        city
        province
        state
        fix
        expand
        articleTitle
        articleDescription
        parentNickName
        parentId
        articleId
      }
    }
  }
`;
