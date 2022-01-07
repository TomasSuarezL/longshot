import { gql } from "graphql-request";
import gqlClient from "../../../../lib/gql-client";

export const fetchTrades = async (first: number = 5, after: number = 0) => {
  const { trades } = await gqlClient.request(
    gql`
      query Trades {
        trades(first:${first}, after:${after}) {
          edges {
            node {
              ticker
              buyDate
              price
            }
          }
          pageInfo {
            hasNextPage
            startCursor
            endCursor
          }
        }
      }
    `
  );
  return trades;
};
