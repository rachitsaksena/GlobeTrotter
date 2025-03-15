import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(
    @Body() input: { username: string; password: string },
  ): Promise<{ accessToken: string; userId: string }> {
    if (!input || !input.username || !input.password) {
      throw new BadRequestException('Invalid input');
    }

    return this.authService.authenticateUser(input);
  }
}
