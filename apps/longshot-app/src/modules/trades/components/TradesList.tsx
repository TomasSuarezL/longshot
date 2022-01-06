import { Trade } from "@longshot/types";

interface TradesListProps {
  trades: Trade[];
}

export const TradesList: React.FC<TradesListProps> = ({ trades }) => {
  return (
    <div>
      Trades
      {trades.map((trade) => (
        <p key={trade.ticker}>{trade.ticker}</p>
      ))}
    </div>
  );
};
