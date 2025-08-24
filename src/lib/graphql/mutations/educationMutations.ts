import { gql } from "@apollo/client";

// CREATE
export const CREATE_EDUCATION = gql`
  mutation CreateEducation(
    $title: String!
    $institution: String!
    $gwa: String!
    $date: String!
    $logo: String!
    $details: [String!]!
  ) {
    createEducation(
      title: $title
      institution: $institution
      gwa: $gwa
      date: $date
      logo: $logo
      details: $details
    ) {
      id
      title
      institution
      gwa
      date
      logo
      details
    }
  }
`;

// UPDATE
export const UPDATE_EDUCATION = gql`
  mutation UpdateEducation(
    $id: ID!
    $title: String
    $institution: String
    $gwa: String
    $date: String
    $logo: String
    $details: [String!]
  ) {
    updateEducation(
      id: $id
      title: $title
      institution: $institution
      gwa: $gwa
      date: $date
      logo: $logo
      details: $details
    ) {
      id
      title
      institution
      gwa
      date
      logo
      details
    }
  }
`;

// DELETE
export const DELETE_EDUCATION = gql`
  mutation DeleteEducation($id: ID!) {
    deleteEducation(id: $id)
  }
`;
