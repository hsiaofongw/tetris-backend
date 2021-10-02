import { Injectable } from '@nestjs/common';
import { AxiosResponse } from '@nestjs/common/node_modules/axios';
import axios from 'axios';
import { TokenInfo } from 'src/token/interfaces';

type ServerReturn = {
  access_token: string;
  scope: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  refresh_token_expires_in?: number;
};

@Injectable()
export class GithubAuthTokenService {
  async getToken(authorizationCode: string) {
    const clientSecret = '';
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
        proxy: { host: 'localhost', port: 7890 },
        headers: { Accept: 'application/json' },
      },
    );

    console.log({ data });

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
