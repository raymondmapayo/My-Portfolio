// src/lib/graphql/typeDefs/socialTypeDef.ts
export const socialTypeDef = `
  type SocialLink {
    id: ID!
    platform: String!
    url: String!
  }

  extend type Query {
    socialLinks: [SocialLink!]!
    socialLinkById(id: ID!): SocialLink
  }

  extend type Mutation {
    createSocialLink(platform: String!, url: String!): SocialLink!
    updateSocialLink(id: ID!, platform: String, url: String): SocialLink!
    deleteSocialLink(id: ID!): SocialLink!
    deleteAllSocialLinks: [SocialLink!]!
  }
`;
