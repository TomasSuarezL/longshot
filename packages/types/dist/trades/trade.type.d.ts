export declare enum AssetType {
    CRYPTO = "CRYPTO",
    STOCK = "STOCK",
    CEDEAR = "CEDEAR"
}
export declare enum TradeType {
    LONG = "LONG",
    SCALP = "SCALP",
    SHORT = "SHORT",
    SWING = "SWING"
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
