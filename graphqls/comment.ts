import { gql } from 'graphql-request';

export const QUERY_COMMENTS = gql`
  query findComments($search: CommentSearchRequest!) {
    comments(search: $search) {
      total
      data {
        id
        createAt
        updateAt
        state
        nickname
        email
        content
        liking
        emoji
        loginType
        avatar
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
      createAt
      updateAt
      state
      nickname
      email
      content
      liking
      loginType
      avatar
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
  mutation likeComment($id: ID!, $emoji: String!) {
    likeComment(id: $id, emoji: $emoji)
  }
`;
