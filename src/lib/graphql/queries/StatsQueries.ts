import { gql } from "@apollo/client";

export const GET_STATS = gql`
  query GetStats {
    stats {
      id
      experienceYears
      certificates
      projects
      technologies
    }
  }
`;

export const GET_STAT_BY_ID = gql`
  query GetStatById($id: ID!) {
    statById(id: $id) {
      id
      experienceYears
      certificates
      projects
      technologies
    }
  }
`;
