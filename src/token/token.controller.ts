import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { catchError, from, map, Observable } from 'rxjs';
import { GithubAuthTokenService } from 'src/github-auth-token/github-auth-token.service';
import { LoginService } from 'src/login/login.service';
import { JwtQueryResult } from './interfaces';
import { TokenRequestDto } from './token-request.dto';

@Controller('token')
export class TokenController {
  constructor(
    private authToken: GithubAuthTokenService,
    private loginService: LoginService,
  ) {}

  @Get()
  getToken(@Query() dto: TokenRequestDto): Observable<JwtQueryResult> {
    const token$ = from(this.authToken.getToken(dto.authorizationCode));
    return token$.pipe(
      catchError((error) => {
        throw new HttpException(
          error,
          error.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }),
      map((token) => {
        return {
          result: { jwt: this.loginService.sign(token) },
        } as JwtQueryResult;
      }),
    );
  }
}
