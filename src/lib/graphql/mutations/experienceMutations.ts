import { gql } from "@apollo/client";

// CREATE
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

// UPDATE
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

// DELETE
export const DELETE_EXPERIENCE = gql`
  mutation DeleteExperience($id: ID!) {
    deleteExperience(id: $id)
  }
`;
