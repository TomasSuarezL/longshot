import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { LoggerModule } from 'nestjs-pino';
import { TradesModule } from './trades/trades.module';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    TradesModule,
    TypegooseModule.forRoot(
      `mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DB}`,
    ),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    LoggerModule.forRoot(),
  ],
})
export class AppModule {}
