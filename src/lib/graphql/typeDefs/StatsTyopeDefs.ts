export const statsTypeDef = `
  type Stat {
    id: ID!
    experienceYears: Int!
    certificates: Int!
    projects: Int!
    technologies: Int!
  }

  type Query {
    stats(id: ID): [Stat!]!
    statById(id: ID!): Stat
  }

  type Mutation {
    createStats(
      experienceYears: Int!
      certificates: Int!
      projects: Int!
      technologies: Int!
    ): Stat!
    updateStats(
      id: ID!
      experienceYears: Int
      certificates: Int
      projects: Int
      technologies: Int
    ): Stat!
    deleteStats(id: ID!): Stat!
    deleteAllStats: [Stat!]!
  }
`;
