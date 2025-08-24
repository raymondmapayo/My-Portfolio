import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query GetProjects {
    getProjects {
      id
      title
      tech
      visibility
      info {
        icon
        label
      }
      images {
        src
        paragraphs
      }
      date
    }
  }
`;

export const GET_PROJECT_BY_ID = gql`
  query GetProjectById($id: ID!) {
    getProjectById(id: $id) {
      id
      title
      tech
      visibility
      info {
        icon
        label
      }
      images {
        src
        paragraphs
      }
      date
    }
  }
`;
