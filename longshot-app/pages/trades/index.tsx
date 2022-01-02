import { gql } from "@apollo/client";
import React from "react";
import client from "../../lib/apollo-client";

const TradesIndex = ({ trades }: { trades: any }) => {
  return <div>Trades</div>;
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
