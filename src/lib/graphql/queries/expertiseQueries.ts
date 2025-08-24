import { gql } from "@apollo/client";

export const GET_EXPERTISE = gql`
  query GetExpertise {
    expertise {
      id
      title
      description
    }
  }
`;
