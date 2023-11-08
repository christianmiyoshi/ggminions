import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SummonerDTO } from '../dto/SummonerDTO';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Summoner } from '../models/Summoner';
import {ConfigService} from '@nestjs/config'

@Injectable()
export class RiotApiService {

    urlBR = 'https://br1.api.riotgames.com/lol'

    constructor(
        private readonly httpService: HttpService,
        private configService: ConfigService
    ) {}

    get<T>(path: string) : Observable<AxiosResponse<T>> {
        const key = this.configService.get<string>('RIOT_API_KEY')
        const url = `${this.urlBR}${path}/?api_key=${key}`
        return this.httpService.get<T>(url);
    }
}
