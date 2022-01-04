export enum TradeType {
  LONG = "LONG",
  SHORT = "SHORT",
}

export interface Trade {
  buyDate: Date;
  fee?: number;
  price: number;
  rrRatio?: number;
  stopLoss: number;
  stopLossPercentage?: number;
  target: number;
  targetPercentage?: number;
  ticker: string;
  total?: number;
  type: TradeType;
  quantity: number;
}
