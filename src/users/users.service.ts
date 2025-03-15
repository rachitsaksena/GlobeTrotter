import { BadRequestException, Injectable } from '@nestjs/common';
import type { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  async findUserById(userId: string): Promise<User> {
    let user: User | null = null;
    try {
      const userPromise = this.prismaService.user.findFirstOrThrow({
        where: { id: userId },
      });
      user = await userPromise;
    } catch {
      throw new BadRequestException('User Not Found');
    }
    return user;
  }

  async findUsersByUserName(username: string): Promise<User> {
    let user: User | null = null;
    try {
      const userPromise = this.prismaService.user.findFirstOrThrow({
        where: { username },
      });
      user = await userPromise;
    } catch {
      throw new BadRequestException('User Not Found');
    }
    return user;
  }

  async addUser({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<void> {
    try {
      await this.prismaService.user.create({
        data: {
          username,
          password,
        },
      });
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Invalid input');
    }
  }

  async deleteUser({ userId }: { userId: string }): Promise<void> {
    try {
      await this.prismaService.user.delete({
        where: {
          id: userId,
        },
      });
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Invalid input');
    }
  }
}
