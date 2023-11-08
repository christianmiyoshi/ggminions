import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LeagueOfLegendsModule } from './league-of-legends/league-of-legends.module';

@Module({
  imports: [LeagueOfLegendsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
