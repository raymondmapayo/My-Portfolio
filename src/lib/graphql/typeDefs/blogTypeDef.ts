export const blogTypeDef = `
  type Blog {
    id: ID!
    title: String!
    image: String!
    date: String!
    content: String!
  }

  type Query {
    blogs(id: ID): [Blog!]!          # Get all or by optional ID
    blogById(id: ID!): Blog           # Get single blog by ID
  }

  type Mutation {
    createBlog(title: String!, image: String!, date: String!, content: String!): Blog!
    updateBlog(id: ID!, title: String, image: String, date: String, content: String): Blog!
    deleteBlog(id: ID!): Blog!
    deleteAllBlogs: [Blog!]!          # Delete all blogs
  }
`;
