import { Module } from '@nestjs/common';
import { DestinationsService } from './destinations.service';
import { DestinationsController } from './destinations.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [DestinationsService],
  controllers: [DestinationsController],
  imports: [PrismaModule],
})
export class DestinationsModule {}
