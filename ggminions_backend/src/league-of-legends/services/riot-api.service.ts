import { Injectable } from '@nestjs/common';
import { Observable, firstValueFrom } from 'rxjs';
import { SummonerDTO } from '../dto/SummonerDTO';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Summoner } from '../models/Summoner';
import { ConfigService } from '@nestjs/config';
import { ApiLog } from 'src/model/ApiLog';

@Injectable()
export class RiotApiService {
  urlBR = 'https://br1.api.riotgames.com';

  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(ApiLog) private apiLogRepository: Repository<ApiLog>,
    private configService: ConfigService,
  ) {}

  async get<T>(
    path: string,
    urlParameters: { [key: string]: string } = {},
  ): Promise<T> {
    const key = this.configService.get<string>('RIOT_API_KEY');

    let pathParameters = path;
    Object.entries(urlParameters).forEach(([key, value]) => {
      pathParameters = pathParameters.replace(`\{${key}\}`, value);
    });

    const url = `${this.urlBR}${pathParameters}/?api_key=${key}`;
    const response = await firstValueFrom(this.httpService.get<T>(url));
    const data = response.data;

    this.log('GET', path, data, urlParameters);

    return data;
  }

  log(
    method: string,
    path: string,
    response: { [key: string]: any },
    urlParameters: { [key: string]: string } = {},
    body: { [key: string]: any } = {},
  ) {
    const log = new ApiLog();
    log.url = this.urlBR;
    log.url_parameters = urlParameters;
    log.path = path;
    log.response = response;
    log.method = method;
    log.body = body;
    this.apiLogRepository.save(log);
  }
}
