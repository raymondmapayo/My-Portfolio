// src/lib/graphql/queries/socialQueries.ts
import { gql } from "@apollo/client";

export const GET_SOCIAL_LINKS = gql`
  query GetSocialLinks {
    socialLinks {
      id
      platform
      url
    }
  }
`;

export const GET_SOCIAL_LINK_BY_ID = gql`
  query GetSocialLinkById($id: ID!) {
    socialLinkById(id: $id) {
      id
      platform
      url
    }
  }
`;
