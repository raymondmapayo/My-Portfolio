// frontend/src/graphql/myBlogMutations.ts
import { gql } from "@apollo/client";

export const CREATE_MY_BLOG = gql`
  mutation CreateMyBlog($input: MyBlogInput!) {
    createMyBlog(input: $input) {
      id
      image
      date
      title
      featured
    }
  }
`;

export const UPDATE_MY_BLOG = gql`
  mutation UpdateMyBlog($id: ID!, $input: MyBlogInput!) {
    updateMyBlog(id: $id, input: $input) {
      id
      image
      date
      title
      featured
    }
  }
`;

export const DELETE_MY_BLOG = gql`
  mutation DeleteMyBlog($id: ID!) {
    deleteMyBlog(id: $id)
  }
`;
