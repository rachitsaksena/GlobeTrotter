import { Controller, Get, UseGuards } from '@nestjs/common';
import { DestinationsService } from './destinations.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/decorators/CurrentUser.decorator';
import type { SignedUserDetails } from 'src/auth/types';

@Controller('destinations')
export class DestinationsController {
  constructor(private readonly destinationsService: DestinationsService) {}

  @Get('/hints')
  @UseGuards(AuthGuard('jwt'))
  getRandomDestination(
    @CurrentUser() { userId }: SignedUserDetails,
  ): Promise<{ hints: string[] }> {
    return this.destinationsService.getPreviousOrNewDestinationHints(userId);
  }
}
