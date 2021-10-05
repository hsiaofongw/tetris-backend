import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TokenController } from './token/token.controller';
import { GithubAuthTokenService } from './github-auth-token/github-auth-token.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { LoginService } from './login/login.service';
import { UserController } from './user/user.controller';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env.secret'] }),
    JwtModule.register({ secret: process.env['JWT_SECRET'] }),
  ],
  controllers: [AppController, TokenController, UserController],
  providers: [AppService, GithubAuthTokenService, LoginService, JwtStrategy],
})
export class AppModule {}
