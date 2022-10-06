import { gql } from 'graphql-request';

export const QUERY_BLOGS = gql`
  query findBlogs($search: BlogSearchRequest) {
    blogs(search: $search) {
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
        cardStyle
        tags {
          name
        }
      }
      total
    }
  }
`;

export const QUERY_BLOG_PATHS = gql`
  query findBlogs {
    blogs {
      data {
        id
      }
    }
  }
`;

export const QUERY_BLOG_PATHS_WITH_PATH = gql`
  query findBlogs {
    blogs {
      data {
        path
      }
    }
  }
`;

export const QUERY_BLOG = gql`
  query findBlog($path: String!) {
    blog(path: $path) {
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
      cardStyle
      tags {
        name
        id
        path
      }
      prevBlog {
        id
        title
        path
      }
      nextBlog {
        id
        title
        path
      }
    }
  }
`;

export const LIKE_BLOG = gql`
  mutation likeBlog($id: ID!, $count: Int!) {
    likeBlog(id: $id, count: $count)
  }
`;

export const READ_BLOG = gql`
  mutation readBlog($id: ID!) {
    readBlog(id: $id)
  }
`;
