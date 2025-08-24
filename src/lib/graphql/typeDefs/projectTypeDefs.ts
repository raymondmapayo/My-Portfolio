export const projectTypeDefs = `
  type ProjectImage {
    src: String!
    paragraphs: [String!]!
  }

  type InfoItem {
    icon: String
    label: String!
  }

  type Project {
    id: ID!
    title: String!
    tech: [String!]!
    visibility: String!
    info: [InfoItem!]!
    images: [ProjectImage!]!
    date: String!  # ISO date string
  }

  extend type Query {
    getProjects: [Project!]!
    getProjectById(id: ID!): Project
  }

  input ProjectImageInput {
    src: String!
    paragraphs: [String!]!
  }

  input InfoItemInput {
    icon: String
    label: String!
  }

  input CreateProjectInput {
    title: String!
    tech: [String!]!
    visibility: String!
    info: [InfoItemInput!]
    images: [ProjectImageInput!]
    date: String
  }

  input UpdateProjectInput {
    title: String
    tech: [String!]
    visibility: String
    info: [InfoItemInput!]
    images: [ProjectImageInput!]
    date: String
  }

  extend type Mutation {
    createProject(input: CreateProjectInput!): Project!
    updateProject(id: ID!, input: UpdateProjectInput!): Project!
    deleteProject(id: ID!): Boolean!
  }
`;
