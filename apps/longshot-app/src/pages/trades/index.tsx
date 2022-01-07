import React from "react";
import { Trade } from "@longshot/types";
import { TradesList } from "../../modules/trades/components/TradesList";
import { fetchTrades } from "../../modules/trades/graphql/queries/fetchTrades";
import { dehydrate, QueryClient, useInfiniteQuery, useQuery } from "react-query";
import { PaginatedResponse } from "../../lib/gql-client";

const TradesIndex = () => {
  const {
    data: trades,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<PaginatedResponse<Trade>>(
    "trades",
    ({ pageParam }) => fetchTrades(undefined, pageParam),
    {
      getNextPageParam: (lastPage, pages) =>
        lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor : undefined,
    }
  );

  console.log(hasNextPage);

  return (
    <div>
      <TradesList
        trades={
          trades?.pages
            .map((p) => p.edges)
            .flat()
            .map((e) => e.node) ?? []
        }
      />
      <button onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load More"
          : "Nothing more to load"}
      </button>
    </div>
  );
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery("trades", () => fetchTrades());

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}

export default TradesIndex;
