import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TokenController } from './token/token.controller';
import { GithubAuthTokenService } from './github-auth-token/github-auth-token.service';

@Module({
  imports: [],
  controllers: [AppController, TokenController],
  providers: [AppService, GithubAuthTokenService],
})
export class AppModule {}
