import { gql } from "@apollo/client";

// Queries
export const GET_EXPERIENCES = gql`
  query GetExperiences {
    getExperiences {
      id
      title
      business
      location
      date
      image
      details
    }
  }
`;

export const GET_EXPERIENCE_BY_ID = gql`
  query GetExperienceById($id: ID!) {
    getExperienceById(id: $id) {
      id
      title
      business
      location
      date
      image
      details
    }
  }
`;

// Mutations
export const CREATE_EXPERIENCE = gql`
  mutation CreateExperience(
    $title: String!
    $business: String!
    $location: String!
    $date: String!
    $image: String!
    $details: [String!]!
  ) {
    createExperience(
      title: $title
      business: $business
      location: $location
      date: $date
      image: $image
      details: $details
    ) {
      id
      title
      business
      location
      date
      image
      details
    }
  }
`;

export const UPDATE_EXPERIENCE = gql`
  mutation UpdateExperience(
    $id: ID!
    $title: String
    $business: String
    $location: String
    $date: String
    $image: String
    $details: [String!]
  ) {
    updateExperience(
      id: $id
      title: $title
      business: $business
      location: $location
      date: $date
      image: $image
      details: $details
    ) {
      id
      title
      business
      location
      date
      image
      details
    }
  }
`;

export const DELETE_EXPERIENCE = gql`
  mutation DeleteExperience($id: ID!) {
    deleteExperience(id: $id)
  }
`;
