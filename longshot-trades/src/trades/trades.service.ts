import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CreateTradeInput, Trade } from './model/trade.model';

@Injectable()
export class TradesService {
  constructor(
    @InjectModel(Trade)
    private readonly tradeModel: ReturnModelType<typeof Trade>,
    private readonly config: ConfigService,
  ) {}

  async create(createTradeInput: CreateTradeInput) {
    const createdTrade = new this.tradeModel(createTradeInput);

    const { quantity, price, target, stopLoss } = createdTrade;

    createdTrade.total = price * quantity;
    createdTrade.rrRatio = (target - price) / (price - stopLoss);
    createdTrade.stopLossPercentage = 1 - stopLoss / price;
    createdTrade.targetPercentage = target / price - 1;

    return await createdTrade.save();
  }

  async findAll() {
    console.log(this.config.get<string>('iolComission'));
    return this.tradeModel.find({});
  }
}
