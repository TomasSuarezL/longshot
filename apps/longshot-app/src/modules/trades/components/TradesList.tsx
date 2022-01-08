import { Table, Thead, Tr, Th, Tbody, Td, Tfoot } from "@chakra-ui/react";
import { Trade } from "@longshot/types";

interface TradesListProps {
  trades: Trade[];
}

export const TradesList: React.FC<TradesListProps> = ({ trades }) => {
  return (
    <div>
      Trades
      <Table variant="simple">
        <Thead>
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
    </div>
  );
};
