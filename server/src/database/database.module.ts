import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        autoLoadEntities: true,
        dbName: configService.get<string>('database.name'),
        user: configService.get<string>('database.user'),
        password: configService.get<string>('database.password'),
        type: configService.get<'postgresql'>('database.type'),
        port: configService.get<number>('database.port'),
      }),
    }),
  ],
})
export class DatabaseModule {}
