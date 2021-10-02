import { Test, TestingModule } from '@nestjs/testing';
import { GithubAuthTokenService } from './github-auth-token.service';

describe('GithubAuthTokenService', () => {
  let service: GithubAuthTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GithubAuthTokenService],
    }).compile();

    service = module.get<GithubAuthTokenService>(GithubAuthTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
