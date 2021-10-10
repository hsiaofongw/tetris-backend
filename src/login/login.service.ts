import { Injectable } from '@nestjs/common';
import { TokenInfo } from 'src/token/interfaces';
import { JwtService } from '@nestjs/jwt';

export type ILoginInfo = {
  oauthTokenInfo: TokenInfo;
  jwtToken: string;
};

@Injectable()
export class LoginService {
  constructor(private jwtService: JwtService) {}

  public sign(tokenInfo: TokenInfo, username: string): string {
    const expiresIn = tokenInfo.expiresIn.toString() + 's';
    const jwt = this.jwtService.sign(
      { expiresIn, username, token: tokenInfo.accessToken },
      { expiresIn },
    );
    return jwt;
  }
}
