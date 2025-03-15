import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { GameService } from './game.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/decorators/CurrentUser.decorator';
import type { SignedUserDetails } from 'src/auth/types';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('guess')
  @UseGuards(AuthGuard('jwt'))
  async submitGuess(
    @CurrentUser() user: SignedUserDetails,
    @Body('guess') guess: string,
  ) {
    return this.gameService.submitGuess({ guess, userId: user.userId });
  }
}
