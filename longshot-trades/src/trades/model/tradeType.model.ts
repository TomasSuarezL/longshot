import { registerEnumType } from '@nestjs/graphql';

export enum TradeType {
  LONG = 'LONG',
  SHORT = 'SHORT',
}

registerEnumType(TradeType, {
  name: 'TradeType',
  description: 'the different types of trades',
});
