import { GraphQLClient } from "graphql-request";

const endpoint = "http://localhost:3001/graphql";

const gqlClient = new GraphQLClient(endpoint);

export default gqlClient;
