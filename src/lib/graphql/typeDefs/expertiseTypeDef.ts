export const expertiseTypeDef = `
  type Expertise {
    id: ID!
    title: String!
    description: String!
  }

  extend type Query {
    expertise: [Expertise!]!
    expertiseById(id: ID!): Expertise
  }

  extend type Mutation {
    createExpertise(title: String!, description: String!): Expertise!
    updateExpertise(id: ID!, title: String, description: String): Expertise!
    deleteExpertise(id: ID!): Expertise!
    deleteAllExpertise: [Expertise!]!
  }
`;
