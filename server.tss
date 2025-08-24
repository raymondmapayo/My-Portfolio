import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// Use relative paths (avoid @ alias for Node backend)
import { aboutMeResolver } from "./src/lib/graphql/resolvers/aboutMeResolver";
import { blogResolver } from "./src/lib/graphql/resolvers/blogResolver";
import { certificateResolver } from "./src/lib/graphql/resolvers/certificateResolver";
import { educationResolver } from "./src/lib/graphql/resolvers/educationResolver";
import { emailResolver } from "./src/lib/graphql/resolvers/emailResolver";
import { experienceResolver } from "./src/lib/graphql/resolvers/experienceResolver";
import { expertiseResolver } from "./src/lib/graphql/resolvers/expertiseResolver";
import { myBlogResolver } from "./src/lib/graphql/resolvers/myBlogResolver";
import { projectResolver } from "./src/lib/graphql/resolvers/projectResolver";
import { socialResolver } from "./src/lib/graphql/resolvers/socialResolver";
import { statsResolver } from "./src/lib/graphql/resolvers/StatsResolver";
import { aboutMeTypeDefs } from "./src/lib/graphql/typeDefs/aboutMeTypeDefs ";
import { blogTypeDef } from "./src/lib/graphql/typeDefs/blogTypeDef";
import { certificateTypeDefs } from "./src/lib/graphql/typeDefs/certificateTypeDefs";
import { educationTypeDefs } from "./src/lib/graphql/typeDefs/educationTypeDefs";
import { emailTypeDefs } from "./src/lib/graphql/typeDefs/emailTypeDefs";
import { experienceTypeDefs } from "./src/lib/graphql/typeDefs/experienceTypeDefs";
import { expertiseTypeDef } from "./src/lib/graphql/typeDefs/expertiseTypeDef";
import { myBlogTypeDefs } from "./src/lib/graphql/typeDefs/myBlogTypeDefs";
import { projectTypeDefs } from "./src/lib/graphql/typeDefs/projectTypeDefs";
import { socialTypeDef } from "./src/lib/graphql/typeDefs/socialTypeDefs";
import { statsTypeDef } from "./src/lib/graphql/typeDefs/StatsTyopeDefs";
// Combine typeDefs and resolvers
const typeDefs = [
  educationTypeDefs,
  myBlogTypeDefs,
  certificateTypeDefs,
  statsTypeDef,
  expertiseTypeDef,
  socialTypeDef,
  aboutMeTypeDefs,
  experienceTypeDefs,
  emailTypeDefs,
  blogTypeDef,
  projectTypeDefs,
];
const resolvers = [
  experienceResolver,
  statsResolver,
  expertiseResolver,
  projectResolver,
  socialResolver,
  aboutMeResolver,
  certificateResolver,
  educationResolver,
  emailResolver,
  blogResolver,
  myBlogResolver,
];

// Create Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Start server
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(` Apollo Server ready at lunching..... ${url}`);
