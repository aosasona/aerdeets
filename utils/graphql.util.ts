import { GraphQLClient } from "graphql-request";

const graphqlClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "",
  { headers: {} }
);

export default graphqlClient;
