import React from "react";
import { Box, Button, Flex, Heading, Spacer, useColorModeValue, VStack } from "@chakra-ui/react";
import { Trade } from "@longshot/types";
import { TradesList } from "../../modules/trades/components/TradesList";
import { fetchTrades } from "../../modules/trades/graphql/queries/fetchTrades";
import { dehydrate, QueryClient, useInfiniteQuery, useQuery } from "react-query";
import { PaginatedResponse } from "../../lib/gql-client";
import { AddIcon } from "@chakra-ui/icons";

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
    <VStack overflow="auto">
      <Flex align="center" w="full">
        <Heading m={[1, 2, 4]}>Trades</Heading>
        <Spacer />
        <Button leftIcon={<AddIcon />} colorScheme="green" variant="solid">
          New Trade
        </Button>
      </Flex>
      <Flex
        w="full"
        boxShadow="sm"
        m={[1, 2, 4]}
        bg={useColorModeValue("white", "gray.800")}
        items="center"
        direction="column"
        overflow="auto"
      >
        <TradesList
          trades={
            trades?.pages
              .map((p) => p.edges)
              .flat()
              .map((e) => e.node) ?? []
          }
        />
        <Button
          variant="ghost"
          m={[1, 2, 4]}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </Button>
      </Flex>
    </VStack>
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
