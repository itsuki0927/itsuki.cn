import { gql } from 'graphql-request';

export const QUERY_COMMENTS = gql`
  query findComments($search: CommentSearchRequest!) {
    comments(search: $search) {
      total
      data {
        id
        state
        nickname
        email
        website
        content
        liking
        ip
        agent
        city
        province
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

export const CREATE_COMMENT = gql`
  mutation createComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      id
      state
      nickname
      email
      website
      content
      liking
      ip
      agent
      city
      province
      fix
      expand
      articleTitle
      articleDescription
      parentNickName
      parentId
      articleId
    }
  }
`;

export const LIKE_COMMENT = gql`
  mutation likeComment($id: ID!) {
    likeComment(id: $id)
  }
`;
