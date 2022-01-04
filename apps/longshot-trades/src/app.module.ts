import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { TradesModule } from './trades/trades.module';
import configuration from './configuration';
import { loggerPlugin } from './lib/graphql.logger.plugin';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    TradesModule,
    TypegooseModule.forRoot(
      `mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DB}`,
    ),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      plugins: [loggerPlugin],
    }),
  ],
})
export class AppModule {}
