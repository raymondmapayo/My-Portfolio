export const experienceTypeDefs = `
  type Experience {
    id: ID!
    title: String!
    business: String!
    location: String!
    date: String!
    image: String!
    details: [String!]!
  }

  extend type Query {
    getExperiences: [Experience!]!
    getExperienceById(id: ID!): Experience
  }

  extend type Mutation {
    createExperience(
      title: String!
      business: String!
      location: String!
      date: String!
      image: String!
      details: [String!]!
    ): Experience!

    updateExperience(
      id: ID!
      title: String
      business: String
      location: String
      date: String
      image: String
      details: [String!]
    ): Experience!

    deleteExperience(id: ID!): Boolean!
  }
`;
