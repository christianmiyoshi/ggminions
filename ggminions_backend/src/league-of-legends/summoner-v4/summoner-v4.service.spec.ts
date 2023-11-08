import { Test, TestingModule } from '@nestjs/testing';
import { SummonerV4Service } from './summoner-v4.service';

describe('SummonerV4Service', () => {
  let service: SummonerV4Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SummonerV4Service],
    }).compile();

    service = module.get<SummonerV4Service>(SummonerV4Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
