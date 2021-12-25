import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Connection, Model, Error } from 'mongoose';
import {
  getConnectionToken,
  getModelToken,
  TypegooseModule,
} from 'nestjs-typegoose';
import { TradesService } from '../trades.service';
import { CreateTradeInput, Trade } from '../model/trade.model';
import { closeMongoConnection, mongoModule } from './mongo.test.module';
import { TradeFactory } from './trades.factory';
import { TradeType } from '../model/tradeType.model';
import configuration from '../../configuration';

describe('TradesService', () => {
  let service: TradesService;
  let config: ConfigService;
  let connection: Connection;
  let tradeModel;
  let tradeFactory: TradeFactory;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        mongoModule(),
        TypegooseModule.forFeature([Trade]),
        ConfigModule.forRoot({ load: [configuration] }),
      ],
      providers: [TradesService, ConfigService],
    }).compile();

    service = module.get<TradesService>(TradesService);
    connection = await module.get(getConnectionToken());
    tradeModel = module.get<Model<Trade>>(getModelToken(Trade.name));
    config = module.get<ConfigService>(ConfigService);

    tradeFactory = new TradeFactory();
  });

  afterEach(async () => {
    await connection.dropDatabase();
  });

  afterAll(async () => {
    await connection.close();
    await closeMongoConnection();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should get all the trades in DB', async () => {
      const fakeTrades = tradeFactory.buildTrades(3);
      await tradeModel.insertMany(fakeTrades);

      const trades = await service.findAll();

      expect(trades.length).toBe(3);
      expect(trades[0]).toMatchObject(fakeTrades[0]);
    });
    it('should not get any trade if theres none in DB', async () => {
      const trades = await service.findAll();

      expect(trades.length).toBe(0);
    });
  });

  describe('create', () => {
    it('should not create a new trade with invalid input', async () => {
      try {
        expect(await service.create({} as Trade)).toThrow(
          Error.ValidationError,
        );
      } catch (err) {
        expect(Object.keys(err.errors).length).toBeGreaterThan(0);
        expect(err.errors.buyDate).toBeInstanceOf(Error.ValidatorError);
        expect(err.errors.price).toBeInstanceOf(Error.ValidatorError);
        expect(err.errors.target).toBeInstanceOf(Error.ValidatorError);
        expect(err.errors.ticker).toBeInstanceOf(Error.ValidatorError);
        expect(err.errors.type).toBeInstanceOf(Error.ValidatorError);
        expect(err.errors.stopLoss).toBeInstanceOf(Error.ValidatorError);
        expect(err.errors.quantity).toBeInstanceOf(Error.ValidatorError);
      }
    });

    it('should create a new trade with valid input', async () => {
      const fakeTradeInput: CreateTradeInput = {
        buyDate: new Date(),
        price: 100,
        quantity: 20,
        stopLoss: 80,
        target: 150,
        ticker: 'CTST',
        type: TradeType.LONG,
      };
      const trade = await service.create(fakeTradeInput);

      expect(trade).toBeDefined();
      expect(trade).toMatchObject({
        ...fakeTradeInput,
        total: 2000,
        targetPercentage: 0.5,
        rrRatio: 2.5,
        fee: 2000 * config.get('iolTradeFee'),
      });
      expect(trade.stopLossPercentage).toBeLessThanOrEqual(0.2);
    });
  });
});
