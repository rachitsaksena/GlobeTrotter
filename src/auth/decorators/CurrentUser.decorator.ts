import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { SignedUserDetails } from '../types';
import type { Request } from 'express';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): SignedUserDetails => {
    const request: Request & { user: SignedUserDetails } = ctx
      .switchToHttp()
      .getRequest();

    return request.user;
  },
);
