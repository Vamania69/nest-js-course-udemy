import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { API_URL } from "./urls";

const httpLink = createHttpLink({
  uri: `${API_URL}/graphql`,
  credentials: "include", // Important: Include credentials (cookies)
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
