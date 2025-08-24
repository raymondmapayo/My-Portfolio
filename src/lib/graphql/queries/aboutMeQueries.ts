import { gql } from "@apollo/client";

export const GET_ABOUT_ME = gql`
  query GetAboutMe {
    getAboutMe {
      id
      content
    }
  }
`;

export const GET_ABOUT_ME_BY_ID = gql`
  query GetAboutMeById($id: ID!) {
    getAboutMeById(id: $id) {
      id
      content
    }
  }
`;
