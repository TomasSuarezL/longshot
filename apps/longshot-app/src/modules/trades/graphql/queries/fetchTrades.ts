import { gql } from "graphql-request";
import gqlClient from "../../../../lib/gql-client";

export const fetchTrades = async () => {
  const { trades } = await gqlClient.request(
    gql`
      query Trades {
        trades {
          ticker
          total
          buyDate
        }
      }
    `
  );
  return trades;
};
