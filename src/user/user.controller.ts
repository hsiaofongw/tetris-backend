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
import { UserService } from './user.services';

export type UserInfo = { userId: number; loginInfo: ILoginInfo };

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getUserInfo(@Request() req) {
    const loginInfo = req.user as ILoginInfo;
    if (!loginInfo) {
      throw new InternalServerErrorException();
    }

    const token = loginInfo.oauthTokenInfo.accessToken;

    return this.userService.getUserProfile(token);
  }
}
