import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ErrorInfo, TokenInfo } from 'src/token/interfaces';

/** 此服务负责向 GitHub OAuth 服务器请求 Token 以为接下来进一步获取被授权的资源做准备 */
@Injectable()
export class GithubAuthTokenService {
  async getToken(authorizationCode: string): Promise<TokenInfo> {
    const clientSecret =
      process.env['OAUTH_CLIENT_SECRET'] ?? 'noClientSecretFound';
    const clientId = process.env['OAUTH_CLIENT_ID'] ?? 'noClientIdFound';
    const githubUrl = process.env['OAUTH_GITHUB_URL'] ?? 'noGitHubURLFound';

    const payload = {
      client_id: clientId,
      client_secret: clientSecret,
      code: authorizationCode,
    };

    const headers = { Accept: 'application/json' };

    return new Promise((resolve, reject) => {
      axios
        .post<any, any>(githubUrl, payload, {
          responseType: 'json',
          headers,
        })
        .then((serverReturn) => {
          const data = serverReturn.data;

          if (data.error) {
            reject({
              errorCode: data.error,
              message: data.error_description,
              errorUri: data.error_uri,
            } as ErrorInfo);
            return;
          }

          resolve({
            accessToken: data.access_token,
            scope: data.scope,
            tokenType: data.token_type,
            expiresIn: data.expires_in,
            refreshToken: data.refresh_token,
            refreshTokenExpiresIn: data.refresh_token_expires_in,
          } as TokenInfo);
        })
        .catch((error) =>
          reject({
            statusCode: error.response?.status,
            message: error.response.data ?? error.message,
          } as ErrorInfo),
        );
    });
  }
}
