import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SummonerDTO } from '../dto/SummonerDTO';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Summoner } from '../models/Summoner';
import { RiotApiService } from '../services/riot-api.service';

@Injectable()
export class SummonerV4Service {

    constructor(
        private api: RiotApiService,
        @InjectRepository(Summoner)
        private summonerRepository: Repository<Summoner>,
    ) {}

    findSummonerByName(name: string) : Observable<AxiosResponse<SummonerDTO>> {
        return this.api.get<SummonerDTO>(`/summoner/v4/summoners/by-name/${name}`);
    }

    async findOrCreate(puuid: string) {
        const summoner = await this.summonerRepository.findOneBy({
            puuid: puuid
        })
        if(summoner) return summoner;

        const newSummoner = new Summoner()
        newSummoner.puuid = puuid
        return newSummoner
    }

    async save(summonerDTO: SummonerDTO) {                
        const summoner = await this.findOrCreate(summonerDTO.puuid)
        summoner.accountId = summonerDTO.accountId
        summoner.name = summonerDTO.name
        summoner.riotId = summonerDTO.id
        summoner.puuid = summonerDTO.puuid
        summoner.summonerLevel = summonerDTO.summonerLevel
        return this.summonerRepository.save(summoner);
    }

    findAll() {
        return this.summonerRepository.find();
    }
}
