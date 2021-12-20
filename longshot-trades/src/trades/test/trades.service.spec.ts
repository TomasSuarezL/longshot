import { Test, TestingModule } from '@nestjs/testing';
import {
  getConnectionToken,
  getModelToken,
  TypegooseModule,
} from 'nestjs-typegoose';
import { TradesService } from '../trades.service';
import { Trade } from '../model/trade.model';
import { Connection, Model } from 'mongoose';
import { tradesFixture } from './trades.fixture';
import { closeMongoConnection, mongoModule } from './mongo.test.module';

describe('TradesService', () => {
  let service: TradesService;
  let connection: Connection;
  let tradeModel;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [mongoModule(), TypegooseModule.forFeature([Trade])],
      providers: [TradesService],
    }).compile();

    service = module.get<TradesService>(TradesService);
    connection = await module.get(getConnectionToken());
    tradeModel = module.get<Model<Trade>>(getModelToken(Trade.name));
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

  describe('findAll', async () => {
    it('should get all the trades in DB', async () => {
      await tradeModel.insertMany(tradesFixture);

      const trades = await service.findAll();

      expect(trades.length).toBe(3);
    });
    it('should not get any trade if theres none in DB', async () => {
      const trades = await service.findAll();

      expect(trades.length).toBe(0);
    });
  });
});
