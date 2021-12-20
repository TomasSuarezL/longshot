/* eslint-disable  @typescript-eslint/no-unused-vars */
import { Field, Float, InputType, ObjectType } from '@nestjs/graphql';
import { prop } from '@typegoose/typegoose';
import { TradeType } from './tradeType.model';

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

@ObjectType()
export class Trade {
  @prop({ required: true })
  @Field((type) => Date)
  buyDate: Date;

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
