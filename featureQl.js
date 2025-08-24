// featuresQl.js
import { v4 as uuidv4 } from "uuid";

let features = [
  {
    id: "1",
    image: "/design.jpg",
    title: "Modern UI Design",
    date: "July 20, 2025",
  },
  {
    id: "2",
    image: "/maps_image.jpg",
    title: "Fast Performance",
    date: "July 19, 2025",
  },
];

// --- GraphQL typeDefs for Features ---
export const featureTypeDefs = `#graphql
  type Feature {
    id: ID!
    image: String!
    title: String!
    date: String!
  }

  type Query {
    features: [Feature!]!
  }

  type Mutation {
    addFeature(image: String!, title: String!, date: String!): Feature!
    updateFeature(id: ID!, image: String, title: String, date: String): Feature!
    deleteFeature(id: ID!): Feature!
  }
`;

// --- Resolvers ---
export const featureResolvers = {
  Query: {
    features: () => features,
  },
  Mutation: {
    addFeature: (_, { image, title, date }) => {
      const newFeature = { id: uuidv4(), image, title, date };
      features.push(newFeature);
      return newFeature;
    },
    updateFeature: (_, { id, image, title, date }) => {
      const feature = features.find((f) => f.id === id);
      if (!feature) throw new Error("Feature not found");
      if (image !== undefined) feature.image = image;
      if (title !== undefined) feature.title = title;
      if (date !== undefined) feature.date = date;
      return feature;
    },
    deleteFeature: (_, { id }) => {
      const index = features.findIndex((f) => f.id === id);
      if (index === -1) throw new Error("Feature not found");
      const removed = features.splice(index, 1)[0];
      return removed;
    },
  },
};
