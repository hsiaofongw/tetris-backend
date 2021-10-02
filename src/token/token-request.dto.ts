import { ApiProperty } from '@nestjs/swagger';

export class TokenRequestDto {
  @ApiProperty({
    description: 'The authorization code that github send us by callback',
  })
  authorizationCode: string;
}
