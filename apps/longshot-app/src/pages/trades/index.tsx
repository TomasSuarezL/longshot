import React from "react";
import { Trade } from "@longshot/types";
import { TradesList } from "../../modules/trades/components/TradesList";
import { fetchTrades } from "../../modules/trades/graphql/queries/fetchTrades";
import { dehydrate, QueryClient, useQuery } from "react-query";

const TradesIndex = () => {
  const { data: trades } = useQuery<Trade[]>("trades", fetchTrades);
  return (
    <div>
      <TradesList trades={trades?.slice(0, 4) ?? []} />
    </div>
  );
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("trades", fetchTrades);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default TradesIndex;
