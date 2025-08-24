export const emailTypeDefs = `
  extend type Mutation {
    sendEmail(name: String!, email: String!, message: String!): Boolean!
  }
`;
