import { Table, Thead, Tr, Th, Tbody, Td, useColorModeValue } from "@chakra-ui/react";
import { Trade } from "@longshot/types";

interface TradesListProps {
  trades: Trade[];
}

export const TradesList: React.FC<TradesListProps> = ({ trades }) => {
  return (
    <Table variant="simple">
      <Thead position="sticky" top="0" bg={useColorModeValue("gray.100", "gray.900")}>
        <Tr>
          <Th>Ticker</Th>
          <Th>Buy Date</Th>
          <Th isNumeric>Price</Th>
        </Tr>
      </Thead>
      <Tbody>
        {trades.map((trade) => (
          <Tr key={trade.ticker}>
            <Td>{trade.ticker}</Td>
            <Td>{new Date(trade.buyDate).toLocaleString()}</Td>
            <Td isNumeric>{trade.price}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
