import { Injectable } from '@nestjs/common';
import { AxiosResponse } from '@nestjs/common/node_modules/axios';
import axios from 'axios';
import { TokenInfo } from 'src/token/interfaces';

/** GitHub OAuth 服务器与 token 一并返回的东西的类型 */
type ServerReturn = {
  access_token: string;
  scope: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  refresh_token_expires_in?: number;
};

/** 此服务负责向 GitHub OAuth 服务器请求 Token 以为接下来进一步获取被授权的资源做准备 */
@Injectable()
export class GithubAuthTokenService {
  async getToken(authorizationCode: string): Promise<TokenInfo> {
    const clientSecret =
      process.env['OAUTH_CLIENT_SECRET'] ?? 'noClientSecretFound';

    const clientId = 'Iv1.904dfc227b774cc7';
    const payload = {
      client_id: clientId,
      client_secret: clientSecret,
      code: authorizationCode,
    };
    const { data } = await axios.post<any, AxiosResponse<ServerReturn>>(
      'https://github.com/login/oauth/access_token',
      payload,
      {
        responseType: 'json',
        headers: { Accept: 'application/json' },
      },
    );

    return {
      accessToken: data.access_token,
      scope: data.scope,
      tokenType: data.token_type,
      expiresIn: data.expires_in,
      refreshToken: data.refresh_token,
      refreshTokenExpiresIn: data.refresh_token_expires_in,
    } as TokenInfo;
  }
}
