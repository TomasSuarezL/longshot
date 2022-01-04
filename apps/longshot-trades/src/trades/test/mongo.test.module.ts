import { MongoMemoryServer } from 'mongodb-memory-server';
import { TypegooseModule, TypegooseModuleOptions } from 'nestjs-typegoose';

let mongod: MongoMemoryServer;

export const mongoModule = (
  customOpts: Omit<TypegooseModuleOptions, 'uri'> = {},
) =>
  TypegooseModule.forRootAsync({
    useFactory: async () => {
      mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      return {
        uri,
        ...customOpts,
      };
    },
  });

export const closeMongoConnection = async () => {
  if (mongod) await mongod.stop();
};
