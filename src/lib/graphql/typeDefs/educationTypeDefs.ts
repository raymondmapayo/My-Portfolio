export const educationTypeDefs = `
  type Education {
    id: ID!
    title: String!
    institution: String!
    gwa: String!      # still required in the type, but resolver ensures empty string if not provided
    date: String!
    logo: String!
    details: [String!]!
  }

  extend type Query {
    getEducations: [Education!]!
    getEducationById(id: ID!): Education
  }

  extend type Mutation {
    createEducation(
      title: String!
      institution: String!
      gwa: String       # now optional in mutation input
      date: String!
      logo: String!
      details: [String!]!
    ): Education!

    updateEducation(
      id: ID!
      title: String
      institution: String
      gwa: String       # optional for updates
      date: String
      logo: String
      details: [String!]
    ): Education!

    deleteEducation(id: ID!): Boolean!
  }
`;
