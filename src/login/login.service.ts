import { Injectable } from '@nestjs/common';
import { TokenInfo } from 'src/token/interfaces';
import { JwtService } from '@nestjs/jwt';

export type ILoginInfo = {
  oauthTokenInfo: TokenInfo;
  jwtToken: string;
};

@Injectable()
export class LoginService {
  loginInfos: ILoginInfo[] = [];

  constructor(private jwtService: JwtService) {}

  issueNewUserId(): number {
    return this.loginInfos.length;
  }

  sign(tokenInfo: TokenInfo, username: string): string {
    const userId = this.issueNewUserId();
    const expiresIn = tokenInfo.expiresIn.toString() + 's';
    const jwt = this.jwtService.sign(
      { userId, expiresIn, username },
      { expiresIn },
    );
    const loginInfo: ILoginInfo = { oauthTokenInfo: tokenInfo, jwtToken: jwt };
    this.loginInfos.push(loginInfo);
    return jwt;
  }

  findUserLoginInfo(userId: number): ILoginInfo {
    return this.loginInfos[userId];
  }
}
