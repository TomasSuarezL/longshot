import { CreateTrade, Trade } from "@longshot/types";
import { gql } from "graphql-request";
import gqlClient from "../../../../lib/gql-client";

export const createTrade = async (trade: CreateTrade): Promise<Trade> => {
  const { createTrade } = await gqlClient.request(
    gql`
      mutation createTrade($trade: CreateTradeInput!) {
        createTrade(input: $trade) {
          ticker
        }
      }
    `,
    {
      trade,
    }
  );
  return createTrade.ticker;
};
