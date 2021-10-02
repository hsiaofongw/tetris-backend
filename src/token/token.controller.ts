import { Controller, Get, Query } from '@nestjs/common';
import { from, map, Observable } from 'rxjs';
import { GithubAuthTokenService } from 'src/github-auth-token/github-auth-token.service';
import { TokenQueryResult } from './interfaces';
import { TokenRequestDto } from './token-request.dto';

@Controller('token')
export class TokenController {
  constructor(private authToken: GithubAuthTokenService) {}
  @Get('github')
  getGitHubToken(@Query() dto: TokenRequestDto): Observable<TokenQueryResult> {
    const token$ = from(this.authToken.getToken(dto.authorizationCode));
    return token$.pipe(
      map((token) => {
        return { result: { token } } as TokenQueryResult;
      }),
    );
  }
}
