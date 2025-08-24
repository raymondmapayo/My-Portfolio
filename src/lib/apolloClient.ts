// src/lib/apolloClient.ts
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const uri = import.meta.env.VITE_GRAPHQL_URI ?? "http://localhost:4000/graphql";

const client = new ApolloClient({
  link: new HttpLink({
    uri,
    // if your server uses cookies/auth, uncomment the next line:
    // credentials: 'include'
  }),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export default client;
