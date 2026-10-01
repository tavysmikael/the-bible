// apps/api/src/app/auth/dto/register.dto.ts
import { IsEmail, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}