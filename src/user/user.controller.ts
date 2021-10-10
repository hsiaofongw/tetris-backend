import {
  Controller,
  Get,
  InternalServerErrorException,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ILoginInfo } from 'src/login/login.service';
import { UserProfileQueryResult } from './interfaces';

export type UserInfo = { userId: number; loginInfo: ILoginInfo };

@Controller('user')
export class UserController {
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getUserInfo(@Request() req): UserProfileQueryResult {
    const userProfileQueryResult = req.user as UserProfileQueryResult;
    if (!userProfileQueryResult) {
      throw new InternalServerErrorException();
    }

    return userProfileQueryResult;
  }
}
