import { Module } from '@nestjs/common';
import { SummonerV4Service } from './summoner-v4/summoner-v4.service';
import { HttpModule } from '@nestjs/axios';
import { Summoner } from './models/Summoner';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiotApiService } from './services/riot-api.service';
import { ApiLog } from 'src/model/ApiLog';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Summoner, ApiLog])],
  exports: [],
  providers: [SummonerV4Service, RiotApiService],
})
export class LeagueOfLegendsModule {}
