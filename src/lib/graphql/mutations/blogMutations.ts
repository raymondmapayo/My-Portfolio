import { gql } from "@apollo/client";

export const CREATE_BLOG = gql`
  mutation CreateBlog(
    $title: String!
    $image: String!
    $date: String!
    $content: String!
  ) {
    createBlog(title: $title, image: $image, date: $date, content: $content) {
      id
      title
      image
      date
      content
    }
  }
`;

export const UPDATE_BLOG = gql`
  mutation UpdateBlog(
    $id: ID!
    $title: String
    $image: String
    $date: String
    $content: String
  ) {
    updateBlog(
      id: $id
      title: $title
      image: $image
      date: $date
      content: $content
    ) {
      id
      title
      image
      date
      content
    }
  }
`;

export const DELETE_BLOG = gql`
  mutation DeleteBlog($id: ID!) {
    deleteBlog(id: $id) {
      id
    }
  }
`;
