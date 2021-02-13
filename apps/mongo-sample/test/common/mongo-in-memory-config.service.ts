import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection } from 'mongoose';

export class MongoInMemoryConfigService implements MongooseOptionsFactory {
  async createMongooseOptions(): Promise<MongooseModuleOptions> {
    const mongod = new MongoMemoryServer({ autoStart: true });
    const uri = await mongod.getUri();

    await mongod.start();

    return {
      uri,
      connectionFactory: (connection: Connection) => {
        connection.on('error', (error: any) => {
          console.error(`MongoInMemory connection error: ${error.reason}`);
          throw error;
        });

        connection.on('open', () =>
          console.log(`MongoInMemory connection opened`),
        );

        connection.on('connected', () => {
          console.log('MongoInMemory connection established successfully');
          console.debug(`Connection URI @ ${uri}`);
        });

        connection.on('disconnected', () =>
          console.warn('MongoInMemory connection disconnected'),
        );

        process.on('exit', async () => {
          console.log(
            'MongoInMemory connection disconnected through app termination',
          );

          await connection.close();
          await mongod.stop();
        });

        return connection;
      },
    };
  }
}
