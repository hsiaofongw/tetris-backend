import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ILoginInfo, LoginService } from 'src/login/login.service';

export type UserInfo = { userId: number; loginInfo: ILoginInfo };

@Controller('user')
export class UserController {
  constructor(private loginService: LoginService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getUserInfo(@Request() req) {
    return req.user;
  }
}
