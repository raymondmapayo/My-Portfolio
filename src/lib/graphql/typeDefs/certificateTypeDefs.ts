export const certificateTypeDefs = `
  input CertificateInput {
    title: String!
    organization: String!
    dateIssued: String!
    certificateImage: String!
    avatarImage: String!
    certificateLink: String!
  }

  type Certificate {
    id: ID!
    title: String!
    organization: String!
    dateIssued: String!
    certificateImage: String!
    avatarImage: String!
    certificateLink: String!
  }

  extend type Query {
    getCertificates: [Certificate!]!
    getCertificateById(id: ID!): Certificate
  }

  extend type Mutation {
    createCertificate(input: CertificateInput!): Certificate!
    updateCertificate(id: ID!, input: CertificateInput!): Certificate!
    deleteCertificate(id: ID!): Boolean!
  }
`;
