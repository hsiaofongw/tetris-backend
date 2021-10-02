export type TokenInfo = {
  accessToken: string;
  scope?: string;
  tokenType: string;
  expiresIn: number;
  refreshToken?: string;
  refreshTokenExpiresIn?: number;
};

export type TokenQueryResult = {
  message?: string;
  result: {
    token?: TokenInfo;
  };
};
