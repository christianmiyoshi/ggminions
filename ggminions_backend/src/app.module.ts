import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LeagueOfLegendsModule } from './league-of-legends/league-of-legends.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Summoner } from './league-of-legends/models/Summoner';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LeagueOfLegendsModule,
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'root',
        password: 'root',
        database: 'lol',
        entities: [
          Summoner
        ],
        synchronize: true,
      }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
