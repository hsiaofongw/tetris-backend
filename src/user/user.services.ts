import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { UserProfileQueryResult } from './interfaces';

@Injectable()
export class UserService {
  /** token 为 GitHub 服务器返回的 token */
  public getUserProfile(token: string): Promise<UserProfileQueryResult> {
    return axios
      .get<any, any>('https://api.github.com/user', {
        headers: {
          Authorization: 'token ' + token,
          Accept: 'application/json',
        },
        responseType: 'json',
      })
      .then((response) => {
        return {
          result: {
            username: response.data?.login ?? '',
            avatarUrl: response.data?.avatar_url ?? '',
            userGitHubHomePage: response.data?.html_url ?? '',
          },
        } as UserProfileQueryResult;
      });
  }

  public getUserNameFromUserQueryResult(
    userProfileQueryResult: UserProfileQueryResult,
  ): string | undefined {
    if (userProfileQueryResult.error) {
      return undefined;
    }

    if (userProfileQueryResult.result !== undefined) {
      return userProfileQueryResult.result.username;
    }

    return undefined;
  }
}
