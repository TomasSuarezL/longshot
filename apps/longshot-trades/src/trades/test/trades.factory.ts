import * as faker from 'faker';
import { AssetType, TradeType } from '@longshot/types';
import configuration from '../../configuration';
import { Trade } from '../model/trade.model';

export class TradeFactory {
  buildTrade() {
    const fakeFloat = faker.datatype.float();

    let fakeTrade: Trade = {
      ticker: Array.from({ length: 4 }, () =>
        faker.random.alpha().toUpperCase(),
      ).join(''),
      price: fakeFloat,
      buyDate: faker.date.past(),
      quantity: faker.datatype.number(),
      stopLoss: fakeFloat * Math.random(),
      target: fakeFloat * (1 + Math.random()),
      type: Object.values(TradeType)[Math.floor(Math.random() * 4)],
      assetType: Object.values(AssetType)[Math.floor(Math.random() * 3)],
    };

    const { price, target, stopLoss, quantity } = fakeTrade;

    fakeTrade = {
      ...fakeTrade,
      total: price * quantity,
      stopLossPercentage: 1 - stopLoss / price,
      targetPercentage: target / price - 1,
      rrRatio: (target - price) / (price - stopLoss),
      fee: price * quantity * configuration().iolTradeFee,
    };

    return fakeTrade;
  }

  buildTrades(number: number) {
    return Array.from({ length: number }, () => this.buildTrade());
  }
}
