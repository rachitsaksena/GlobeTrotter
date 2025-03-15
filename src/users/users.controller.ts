import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/CurrentUser.decorator';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { UsersService } from './users.service';
import type { SignedUserDetails } from 'src/auth/types';
import type { StrictPick } from 'common/types/utility';
import type { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('/me')
  async me(
    @CurrentUser() { userId }: SignedUserDetails,
  ): Promise<StrictPick<User, 'username' | 'score' | 'id'>> {
    const user = await this.usersService.findUserById(userId);
    return { username: user.username, score: user.score, id: user.id };
  }

  @Get('/')
  async getUser(
    @Query('userId') userId: string,
  ): Promise<StrictPick<User, 'username' | 'score'>> {
    if (!userId) {
      throw new BadRequestException('missing user id');
    }
    const user = await this.usersService.findUserById(userId);
    return { username: user.username, score: user.score };
  }

  @Post('/register')
  async register(
    @Body() input: { username: string; password: string },
  ): Promise<void> {
    if (!input || !input.username || !input.password) {
      throw new BadRequestException('Invalid input');
    }
    await this.usersService.addUser(input);
  }

  @UseGuards(AuthGuard)
  @Delete('/me')
  async deleteMe(@CurrentUser() user: SignedUserDetails): Promise<void> {
    await this.usersService.deleteUser(user);
  }
}
