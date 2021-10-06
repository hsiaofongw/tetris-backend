import {
  Controller,
  Get,
  InternalServerErrorException,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import axios from 'axios';
import { ILoginInfo } from 'src/login/login.service';
import { UserProfileQueryResult } from './interfaces';

export type UserInfo = { userId: number; loginInfo: ILoginInfo };

@Controller('user')
export class UserController {
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getUserInfo(@Request() req) {
    const loginInfo = req.user as ILoginInfo;
    if (!loginInfo) {
      throw new InternalServerErrorException();
    }

    const token = loginInfo.oauthTokenInfo.accessToken;

    return axios
      .get<any, any>('https://api.github.com/user', {
        headers: {
          Authorization: 'token ' + token,
          Accept: 'application/json',
        },
        proxy: {
          host: '127.0.0.1',
          port: 7890,
        },
        responseType: 'json',
      })
      .then((response) => {
        return {
          username: response.data?.login ?? '',
        } as UserProfileQueryResult['result'];
      });
  }
}
