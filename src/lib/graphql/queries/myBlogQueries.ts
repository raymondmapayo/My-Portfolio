// frontend/src/graphql/myBlogQueries.ts
import { gql } from "@apollo/client";

export const GET_MY_BLOGS = gql`
  query GetMyBlogs {
    getMyBlogs {
      id
      image
      date
      title
      featured
    }
  }
`;

export const GET_MY_BLOG_BY_ID = gql`
  query GetMyBlogById($id: ID!) {
    getMyBlogById(id: $id) {
      id
      image
      date
      title
      contentBlocks {
        type
        text
        src
        alt
        caption
      }
      featured
    }
  }
`;
