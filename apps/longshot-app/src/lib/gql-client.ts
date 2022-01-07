import { GraphQLClient } from "graphql-request";

const endpoint = "http://localhost:3001/graphql";

export interface PaginationArgs {
  first: number;
  after: number;
}

export interface PageInfo {
  startCursor: number;
  endCursor: number;
  hasNextPage: boolean;
}

interface EdgeType<T> {
    cursor: string;
    node: T;
}
export interface PaginatedResponse<T> {
  edges: EdgeType<T>[];
  pageInfo: PageInfo;
}

const gqlClient = new GraphQLClient(endpoint);

export default gqlClient;
