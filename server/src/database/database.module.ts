import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      autoLoadEntities: true,
      dbName: 'postgres',
      user: 'coin-keeper',
      password: 'coin-keeper',
      type: 'postgresql',
      port: 3333,
    }),
  ],
})
export class DatabaseModule {}
