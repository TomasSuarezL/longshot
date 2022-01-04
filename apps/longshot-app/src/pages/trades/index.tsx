import { gql } from "@apollo/client";
import React from "react";
import { Trade } from "@longshot/types";
import client from "../../lib/apollo-client";
import { TradesList } from "../../modules/trades/components/TradesList";

const TradesIndex = ({ trades }: { trades: Trade[] }) => {
  return <TradesList trades={trades} />;
};

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query Trades {
        trades {
          ticker
          total
          buyDate
        }
      }
    `,
  });

  return {
    props: {
      trades: data.trades.slice(0, 4),
    },
  };
}

export default TradesIndex;
