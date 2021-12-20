import { Trade } from '../model/trade.model';
import { TradeType } from '../model/tradeType.model';

export const tradesFixture: Trade[] = [
  {
    ticker: 'TEST',
    price: 100,
    buyDate: new Date(),
    quantity: 10,
    stopLoss: 80,
    target: 150,
    type: TradeType.LONG,
    total: 100 * 10,
  },
  {
    ticker: 'TEST2',
    price: 200,
    buyDate: new Date(),
    quantity: 20,
    stopLoss: 230,
    target: 150,
    type: TradeType.SHORT,
    total: 200 * 20,
  },
  {
    ticker: 'TEST3',
    price: 5000,
    buyDate: new Date(),
    quantity: 100,
    stopLoss: 4000,
    target: 10000,
    type: TradeType.LONG,
    total: 100 * 5000,
  },
];
