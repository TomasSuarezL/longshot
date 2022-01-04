import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { Trade } from './model/trade.model';
import { TradesResolver } from './trades.resolver';
import { TradesService } from './trades.service';

@Module({
  imports: [TypegooseModule.forFeature([Trade]), ConfigModule],
  providers: [TradesService, TradesResolver],
})
export class TradesModule {}
