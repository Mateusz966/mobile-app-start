import { MiddlewareConsumer, Module, NestModule, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import config from '../config/default';
import { MikroORM } from '@mikro-orm/core';
import { MikroOrmMiddleware } from '@mikro-orm/nestjs';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    DatabaseModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule, OnModuleInit {
  constructor(private readonly orm: MikroORM) {}

  async onModuleInit(): Promise<void> {
    await this.orm.getMigrator().up();
    const generator = this.orm.getSchemaGenerator();
    await generator.updateSchema();
  }

  // for some reason the auth middlewares in profile and article modules are fired before the request context one,
  // so they would fail to access contextual EM. by registering the middleware directly in AppModule, we can get
  // around this issue
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MikroOrmMiddleware).forRoutes('*');
  }
}
