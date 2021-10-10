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
import { UserService } from './user/user.services';
import { MongooseModule } from '@nestjs/mongoose';
import { getConnectionString } from './mongodb/mongodb.connect';
import { GameLogsModule } from './game-logs/game-logs.module';
import { GetVersionController } from './version/get-version.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env.secret'] }),
    JwtModule.register({ secret: process.env['JWT_SECRET'] }),
    MongooseModule.forRoot(
      getConnectionString({
        username: process.env['MONGODB_USERNAME'],
        password: process.env['MONGODB_PASSWORD'],
        defaultDatabaseName: process.env['DEFAULT_DATABASE_NAME'],
      }),
    ),
    GameLogsModule,
  ],
  controllers: [
    AppController,
    TokenController,
    UserController,
    GetVersionController,
  ],
  providers: [
    AppService,
    GithubAuthTokenService,
    LoginService,
    UserService,
    JwtStrategy,
  ],
})
export class AppModule {}
