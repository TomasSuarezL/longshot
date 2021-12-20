import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTradeInput, Trade } from './model/trade.model';
import { TradesService } from './trades.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of) => Trade)
export class TradesResolver {
  constructor(private tradesService: TradesService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => [Trade])
  async trades() {
    return this.tradesService.findAll();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => Trade)
  async createTrade(@Args('trade') trade: CreateTradeInput) {
    return this.tradesService.create(trade);
  }
}
