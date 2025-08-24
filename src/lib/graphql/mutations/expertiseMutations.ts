// src/lib/graphql/mutations/expertiseMutations.ts
import { gql } from "@apollo/client";

export const CREATE_EXPERTISE = gql`
  mutation CreateExpertise($title: String!, $description: String!) {
    createExpertise(title: $title, description: $description) {
      id
      title
      description
    }
  }
`;

export const UPDATE_EXPERTISE = gql`
  mutation UpdateExpertise($id: ID!, $title: String, $description: String) {
    updateExpertise(id: $id, title: $title, description: $description) {
      id
      title
      description
    }
  }
`;

export const DELETE_EXPERTISE = gql`
  mutation DeleteExpertise($id: ID!) {
    deleteExpertise(id: $id) {
      id
      title
      description
    }
  }
`;

export const DELETE_ALL_EXPERTISE = gql`
  mutation DeleteAllExpertise {
    deleteAllExpertise {
      id
      title
      description
    }
  }
`;
