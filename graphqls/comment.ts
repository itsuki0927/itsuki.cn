import { gql } from 'graphql-request';

export const QUERY_COMMENTS = gql`
  query findComments($search: CommentSearchRequest!) {
    comments(search: $search) {
      total
      data {
        id
        createAt
        nickname
        email
        website
        content
        state
        parentId
        liking
        articleId
      }
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation createComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      id
      createAt
      nickname
      email
      website
      content
      state
      parentId
    }
  }
`;

export const LIKE_COMMENT = gql`
  mutation likeComment($id: ID!) {
    likeComment(id: $id)
  }
`;
