import { Injectable, Logger } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CreateTradeInput, Trade } from './model/trade.model';

@Injectable()
export class TradesService {
  private readonly logger = new Logger(TradesService.name);

  constructor(
    @InjectModel(Trade)
    private readonly tradeModel: ReturnModelType<typeof Trade>,
  ) {}

  async create(createTradeInput: CreateTradeInput) {
    this.logger.debug(
      `Creating new trade from input: ${Object.entries(createTradeInput).join(
        ',',
      )}`,
    );
    const createdTrade = new this.tradeModel(createTradeInput);

    const trade = await createdTrade.save();

    this.logger.debug(`Created new trade: ${trade.toString()}`);

    return trade;
  }

  async findAll() {
    return this.tradeModel.find({});
  }
}
