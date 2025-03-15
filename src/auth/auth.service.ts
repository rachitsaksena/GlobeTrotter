import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import type { SignedUserDetails } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async authenticateUser({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<{ accessToken: string; userId: string }> {
    const validatedUserId = await this.validateUser({ username, password });
    if (!validatedUserId) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.signIn({
      username,
      userId: validatedUserId,
    });

    return {
      accessToken: accessToken,
      userId: validatedUserId,
    };
  }

  async validateUser({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<string | null> {
    const storedUser = await this.usersService.findUsersByUserName(username);
    if (storedUser && storedUser.password === password) {
      return storedUser.id;
    }
    return null;
  }

  async signIn(payload: SignedUserDetails): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
}
