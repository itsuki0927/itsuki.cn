import { gql } from 'graphql-request';

export const QUERY_ARTICLES = gql`
  query findArticles($search: ArticleSearchRequest) {
    articles(search: $search) {
      data {
        id
        createAt
        updateAt
        title
        description
        cover
        commenting
        liking
        reading
      }
      total
    }
  }
`;

export const QUERY_ARTICLE_PATHS = gql`
  query findArticles {
    articles {
      data {
        id
      }
    }
  }
`;

export const QUERY_ARTICLE = gql`
  query findArticle($id: ID!) {
    article(id: $id) {
      id
      createAt
      updateAt
      title
      description
      content
      author
      cover
      keywords
      open
      publish
      origin
      banner
      reading
      liking
      commenting
      path
      tags {
        name
        id
      }
      category {
        name
        path
        id
      }
      prevArticle {
        id
        title
      }
      nextArticle {
        id
        title
      }
    }
  }
`;

export const LIKE_ARTICLE = gql`
  mutation likeArticle($id: ID!) {
    likeArticle(id: $id)
  }
`;
