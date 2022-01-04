/* eslint-disable  @typescript-eslint/no-unused-vars */
import {
  Field,
  Float,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { pre, prop } from '@typegoose/typegoose';
import { TradeType } from '@longshot/types';
import configuration from '../../configuration';

registerEnumType(TradeType, {
  name: 'TradeType',
  description: 'the different types of trades',
});

@InputType()
export class CreateTradeInput {
  @Field((type) => Date)
  buyDate: Date;

  @Field((type) => Float)
  price: number;

  @Field((type) => Float)
  stopLoss: number;

  @Field((type) => Float)
  target: number;

  @Field()
  ticker: string;

  @Field((type) => TradeType)
  type: TradeType;

  @Field((type) => Float)
  quantity: number;
}

@pre<Trade>('save', function () {
  const { price, target, stopLoss, quantity } = this;

  this.total = price * quantity;
  this.rrRatio = (target - price) / (price - stopLoss);
  this.stopLossPercentage = 1 - stopLoss / price;
  this.targetPercentage = target / price - 1;

  // TODO: Use the configured commision to computed commision
  // v1: use IOL commision in the config for all trades/users
  // v2: use the correct commision for the broker configured for the user. (Users service, user with 'broker', common type to map brokers with commision)
  this.fee = this.total * configuration().iolTradeFee;
})
@ObjectType()
export class Trade {
  @prop({ required: true })
  @Field((type) => Date)
  buyDate: Date;

  @prop()
  @Field((type) => Float, { nullable: true })
  fee?: number;

  @prop({ required: true })
  @Field((type) => Float)
  price: number;

  @prop()
  @Field((type) => Float, { nullable: true })
  rrRatio?: number;

  @prop({ required: true })
  @Field((type) => Float)
  stopLoss: number;

  @prop()
  @Field((type) => Float, { nullable: true })
  stopLossPercentage?: number;

  @prop({ required: true })
  @Field((type) => Float)
  target: number;

  @prop()
  @Field((type) => Float, { nullable: true })
  targetPercentage?: number;

  @prop({ required: true })
  @Field()
  ticker: string;

  @prop()
  @Field((type) => Float, { nullable: true })
  total?: number;

  @prop({ required: true, enum: TradeType })
  @Field((type) => TradeType)
  type: TradeType;

  @prop({ required: true })
  @Field((type) => Float)
  quantity: number;
}
