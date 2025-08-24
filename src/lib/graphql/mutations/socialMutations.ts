// src/lib/graphql/mutations/socialMutations.ts
import { gql } from "@apollo/client";

export const CREATE_SOCIAL_LINK = gql`
  mutation CreateSocialLink($platform: String!, $url: String!) {
    createSocialLink(platform: $platform, url: $url) {
      id
      platform
      url
    }
  }
`;

export const UPDATE_SOCIAL_LINK = gql`
  mutation UpdateSocialLink($id: ID!, $platform: String, $url: String) {
    updateSocialLink(id: $id, platform: $platform, url: $url) {
      id
      platform
      url
    }
  }
`;

export const DELETE_SOCIAL_LINK = gql`
  mutation DeleteSocialLink($id: ID!) {
    deleteSocialLink(id: $id) {
      id
      platform
      url
    }
  }
`;

export const DELETE_ALL_SOCIAL_LINKS = gql`
  mutation DeleteAllSocialLinks {
    deleteAllSocialLinks {
      id
      platform
      url
    }
  }
`;
