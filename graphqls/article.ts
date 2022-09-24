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
        path
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

export const QUERY_ARTICLE_PATHS_WITH_PATH = gql`
  query findArticles {
    articles {
      data {
        path
      }
    }
  }
`;

export const QUERY_ARTICLE = gql`
  query findArticle($path: String!) {
    article(path: $path) {
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
        path
      }
      nextArticle {
        id
        title
        path
      }
    }
  }
`;

export const LIKE_ARTICLE = gql`
  mutation likeArticle($id: ID!, $count: Int!) {
    likeArticle(id: $id, count: $count)
  }
`;

export const READ_ARTICLE = gql`
  mutation readArticle($id: ID!) {
    readArticle(id: $id)
  }
`;
