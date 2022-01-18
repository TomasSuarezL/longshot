import { gql } from "graphql-request";
import gqlClient from "../../../../lib/gql-client";

export const fetchTrades = async (first: number = 25, after: number = 0) => {
  const { trades } = await gqlClient.request(
    gql`
      query Trades {
        trades(first:${first}, after:${after}) {
          edges {
            node {
                assetType
                buyDate
                fee
                price
                rrRatio
                stopLoss
                stopLossPercentage
                target
                targetPercentage
                ticker
                total
                type
                quantity
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
