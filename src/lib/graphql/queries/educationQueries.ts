import { gql } from "@apollo/client";

// Queries
export const GET_EDUCATIONS = gql`
  query GetEducations {
    getEducations {
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

export const GET_EDUCATION_BY_ID = gql`
  query GetEducationById($id: ID!) {
    getEducationById(id: $id) {
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

// Mutations
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

export const DELETE_EDUCATION = gql`
  mutation DeleteEducation($id: ID!) {
    deleteEducation(id: $id)
  }
`;
