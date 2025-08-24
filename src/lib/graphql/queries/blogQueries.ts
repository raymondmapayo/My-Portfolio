import { gql } from "@apollo/client";

export const GET_BLOGS = gql`
  query GetBlogs {
    blogs {
      id
      title
      image
      date
      content
    }
  }
`;
