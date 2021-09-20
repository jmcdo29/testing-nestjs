import {
  Injectable,
  OnModuleInit,
  Logger,
  INestApplication,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
      ],
    });
  }

  async onModuleInit() {
    await this.$connect();

    this.$on('query' as any, async (e: any) => {
      this.logger.debug(`(${e.duration}ms) ${e.query}`);
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  async truncate() {
    for (const { tablename } of await this
      .$queryRaw`SELECT tablename FROM pg_tables WHERE schemaname='public'`) {
      if (tablename !== '_prisma_migrations') {
        // eslint-disable-next-line no-await-in-loop
        await this.$queryRaw(`TRUNCATE TABLE "public"."${tablename}" CASCADE;`);
      }
    }
  }

  async resetSequences() {
    for (const { relname } of await this.$queryRaw(
      `SELECT c.relname FROM pg_class AS c JOIN pg_namespace AS n ON c.relnamespace = n.oid WHERE c.relkind='S' AND n.nspname='public';`,
    )) {
      // eslint-disable-next-line no-await-in-loop
      await this.$queryRaw(
        `ALTER SEQUENCE "public"."${relname}" RESTART WITH 1;`,
      );
    }
  }
}
