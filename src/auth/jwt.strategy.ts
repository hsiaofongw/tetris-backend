import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { LoginService } from 'src/login/login.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private loginService: LoginService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env['JWT_SECRET'],
    });
  }

  async validate(payload: { userId?: number }) {
    if (payload.userId !== undefined) {
      return this.loginService.findUserLoginInfo(payload.userId);
    }

    return null;
  }
}
