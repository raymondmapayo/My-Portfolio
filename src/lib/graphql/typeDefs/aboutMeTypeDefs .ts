export const aboutMeTypeDefs = `
  type AboutMe {
    id: ID!
    content: [String!]!
  }

  extend type Query {
    getAboutMe: AboutMe
    getAboutMeById(id: ID!): AboutMe
  }

  input AboutMeInput {
    content: [String!]!
  }

  extend type Mutation {
    createAboutMe(input: AboutMeInput!): AboutMe!
    updateAboutMe(id: ID!, input: AboutMeInput!): AboutMe!
    deleteAboutMe(id: ID!): Boolean!
  }
`;
