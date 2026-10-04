// users.controller.ts
import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@ApiTags('Users (admin)')
@ApiBearerAuth('access-token')
@Controller('users')
export class UsersController {
  constructor(private readonly prisma: PrismaService) {}

  @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.prisma.user.findMany({ select: { id: true, email: true, role: true, createdAt: true } });
  }
}