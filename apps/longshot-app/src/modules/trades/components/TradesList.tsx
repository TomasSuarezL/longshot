import { Table, Thead, Tr, Th, Tbody, Td, useColorModeValue } from "@chakra-ui/react";
import { Trade } from "@longshot/types";

interface TradesListProps {
  trades: Trade[];
}

export const TradesList: React.FC<TradesListProps> = ({ trades }) => {
  return (
    <Table variant="simple">
      <Thead position="sticky" top="0" bg={useColorModeValue("white", "gray.900")}>
        <Tr>
          <Th>Ticker</Th>
          <Th>Type</Th>
          <Th>Asset Type</Th>
          <Th isNumeric>Price</Th>
          <Th isNumeric>Quantity</Th>
          <Th isNumeric>Stop Loss</Th>
          <Th isNumeric>Target</Th>
          <Th isNumeric>Fee</Th>
          <Th isNumeric>Total</Th>
          <Th>Buy Date</Th>
        </Tr>
      </Thead>
      <Tbody>
        {trades.map((trade) => (
          <Tr key={trade.ticker}>
            <Td>{trade.ticker}</Td>
            <Td>{trade.type}</Td>
            <Td>{trade.assetType}</Td>
            <Td isNumeric>{trade.price?.toFixed(2)}</Td>
            <Td isNumeric>{trade.quantity}</Td>
            <Td isNumeric>{trade.stopLoss?.toFixed(2)}</Td>
            <Td isNumeric>{trade.target?.toFixed(2)}</Td>
            <Td isNumeric>{trade.fee?.toFixed(2)}</Td>
            <Td isNumeric>{trade.total?.toFixed(2)}</Td>
            <Td>{new Date(trade.buyDate).toLocaleString()}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
