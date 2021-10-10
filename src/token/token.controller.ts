import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import {
  catchError,
  concatAll,
  concatMap,
  from,
  map,
  Observable,
  zip,
} from 'rxjs';
import { GithubAuthTokenService } from 'src/github-auth-token/github-auth-token.service';
import { LoginService } from 'src/login/login.service';
import { UserProfileQueryResult } from 'src/user/interfaces';
import { UserService } from 'src/user/user.services';
import { JwtQueryResult } from './interfaces';
import { TokenRequestDto } from './token-request.dto';

@Controller('token')
export class TokenController {
  constructor(
    private authToken: GithubAuthTokenService,
    private loginService: LoginService,
    private userService: UserService,
  ) {}

  @Get()
  getToken(@Query() dto: TokenRequestDto): Observable<JwtQueryResult> {
    const tokenInfo$ = from(this.authToken.getToken(dto.authorizationCode));
    const userProfileQueryResult$ = tokenInfo$.pipe(
      catchError((error) => {
        throw new HttpException(
          error,
          error.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }),
      map((tokenInfo) => this.getUserProfile(tokenInfo.accessToken)),
      map((profileQueryResultPromise) => from(profileQueryResultPromise)),
      concatAll(),
    );

    return zip(tokenInfo$, userProfileQueryResult$).pipe(
      map(([tokenInfo, userProfileQueryResult]) => ({
        tokenInfo,
        userProfileQueryResult,
      })),
      map((signPrepare) =>
        this.loginService.sign(
          signPrepare.tokenInfo,
          this.getUserName(signPrepare.userProfileQueryResult),
        ),
      ),
      map((jwtToken) => ({ result: { jwt: jwtToken } } as JwtQueryResult)),
    );
  }

  private getUserName(
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

  private getUserProfile(token: string): Promise<UserProfileQueryResult> {
    return this.userService.getUserProfile(token);
  }
}
