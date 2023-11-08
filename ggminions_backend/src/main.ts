import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SummonerV4Service } from './league-of-legends/summoner-v4/summoner-v4.service';
import { firstValueFrom } from 'rxjs';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // await app.listen(3000);



  const app = await NestFactory.createApplicationContext(AppModule);
  const service = app.get(SummonerV4Service)

  try {
    const summonerDto = await service.findSummonerByName('chrismiyo')
    console.log(summonerDto)
    console.log(await service.save(summonerDto))
    const list = await service.findAll()

    console.log(list.length)
    console.log(list[0])
  }
  catch(e) {
    console.log(e)
    return;
  }
  
}
bootstrap();
