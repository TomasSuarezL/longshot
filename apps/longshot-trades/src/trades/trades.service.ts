import { Injectable, Logger } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { PaginationArgs } from 'src/lib/graphqlPaginated';
import { CreateTradeInput, PaginatedTrade, Trade } from './model/trade.model';

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

  async findAllPaginated(pagination: PaginationArgs): Promise<PaginatedTrade> {
    const { first, after } = pagination;

    this.logger.debug(
      `Getting paginated trades: first ${first} after ${after}`,
    );

    const totalTrades = await this.tradeModel.count();

    const trades = await this.tradeModel
      .find({})
      .skip(after || 0)
      .limit(first || 25)
      .exec();

    return {
      edges: trades.map((trade) => ({ node: trade, cursor: trade._id })),
      pageInfo: {
        startCursor: after,
        endCursor: after + first,
        hasNextPage: totalTrades > after + first,
      },
    };
  }
}
