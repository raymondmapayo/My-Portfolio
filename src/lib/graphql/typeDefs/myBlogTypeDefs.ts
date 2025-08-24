// backend/src/graphql/typeDefs/myBlogTypeDefs.ts
export const myBlogTypeDefs = `
  type ContentBlock {
    type: String!
    text: String
    src: String
    alt: String
    caption: String
  }

  type MyBlog {
    id: ID!
    date: String!
    title: String!
    image: String!
    contentBlocks: [ContentBlock!]!
    featured: Boolean
  }

  input ContentBlockInput {
    type: String!
    text: String
    src: String
    alt: String
    caption: String
  }

  input MyBlogInput {
    date: String!
    title: String!
    image: String!
    contentBlocks: [ContentBlockInput!]!
    featured: Boolean
  }

  extend type Query {
    getMyBlogs: [MyBlog!]!
    getMyBlogById(id: ID!): MyBlog
  }

  extend type Mutation {
    createMyBlog(input: MyBlogInput!): MyBlog!
    updateMyBlog(id: ID!, input: MyBlogInput!): MyBlog!
    deleteMyBlog(id: ID!): Boolean!
  }
`;
