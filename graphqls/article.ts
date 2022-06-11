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
        author
        tags {
          name
        }
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
      publish
      banner
      reading
      liking
      commenting
      path
      tags {
        name
        id
        path
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

export const READ_ARTICLE = gql`
  mutation readArticle($id: ID!) {
    readArticle(id: $id)
  }
`;
