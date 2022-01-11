export enum AssetType {
  CRYPTO = "CRYPTO",
  STOCK = "STOCK",
  CEDEAR = "CEDEAR",
}

export enum TradeType {
  LONG = "LONG",
  SCALP = "SCALP",
  SHORT = "SHORT",
  SWING = "SWING",
}

export interface CreateTrade {
  assetType: AssetType;
  buyDate: Date;
  price: number;
  stopLoss: number;
  target: number;
  ticker: string;
  type: TradeType;
  quantity: number;
}

export interface Trade {
  assetType: AssetType;
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
