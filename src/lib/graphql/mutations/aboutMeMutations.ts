import { gql } from "@apollo/client";

export const CREATE_ABOUT_ME = gql`
  mutation CreateAboutMe($content: [String!]!) {
    createAboutMe(content: $content) {
      id
      content
    }
  }
`;

export const UPDATE_ABOUT_ME = gql`
  mutation UpdateAboutMe($id: ID!, $input: AboutMeInput!) {
    updateAboutMe(id: $id, input: $input) {
      id
      content
    }
  }
`;

export const DELETE_ABOUT_ME = gql`
  mutation DeleteAboutMe($id: ID!) {
    deleteAboutMe(id: $id)
  }
`;
