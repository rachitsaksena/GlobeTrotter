import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DestinationsModule } from './destinations/destinations.module';
import { GameModule } from './game/game.module';

@Module({
  imports: [AuthModule, DestinationsModule, GameModule],
})
export class AppModule {}
