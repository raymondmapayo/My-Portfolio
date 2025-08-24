import { gql } from "@apollo/client";

export const CREATE_STATS = gql`
  mutation CreateStats(
    $experienceYears: Int!
    $certificates: Int!
    $projects: Int!
    $technologies: Int!
  ) {
    createStats(
      experienceYears: $experienceYears
      certificates: $certificates
      projects: $projects
      technologies: $technologies
    ) {
      id
      experienceYears
      certificates
      projects
      technologies
    }
  }
`;

export const UPDATE_STATS = gql`
  mutation UpdateStats(
    $id: ID!
    $experienceYears: Int
    $certificates: Int
    $projects: Int
    $technologies: Int
  ) {
    updateStats(
      id: $id
      experienceYears: $experienceYears
      certificates: $certificates
      projects: $projects
      technologies: $technologies
    ) {
      id
      experienceYears
      certificates
      projects
      technologies
    }
  }
`;

export const DELETE_STATS = gql`
  mutation DeleteStats($id: ID!) {
    deleteStats(id: $id) {
      id
    }
  }
`;

export const DELETE_ALL_STATS = gql`
  mutation DeleteAllStats {
    deleteAllStats {
      id
    }
  }
`;
