import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PaginationArgs } from 'src/lib/graphqlPaginated';
import { CreateTradeInput, PaginatedTrade, Trade } from './model/trade.model';
import { TradesService } from './trades.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of) => Trade)
export class TradesResolver {
  constructor(private tradesService: TradesService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => PaginatedTrade)
  async trades(@Args() pagination: PaginationArgs) {
    return this.tradesService.findAllPaginated(pagination);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => Trade)
  async createTrade(@Args('input') input: CreateTradeInput) {
    return this.tradesService.create(input);
  }
}
