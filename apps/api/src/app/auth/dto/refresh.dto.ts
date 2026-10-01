// apps/api/src/app/auth/dto/refresh.dto.ts
import { IsString } from 'class-validator';

export class RefreshDto {
  @IsString()
  refreshToken: string;
}