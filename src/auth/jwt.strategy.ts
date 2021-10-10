import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserProfileQueryResult } from 'src/user/interfaces';
import { UserService } from 'src/user/user.services';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env['JWT_SECRET'],
    });
  }

  async validate(payload: {
    token: string;
  }): Promise<UserProfileQueryResult | null> {
    if (!!payload.token) {
      return this.userService.getUserProfile(payload.token);
    }

    return null;
  }
}
