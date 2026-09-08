import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) { }

    async register(email: string, password: string) {
        const existing = await this.prisma.user.findUnique({ where: { email } });
        if (existing) throw new ConflictException('Email já cadastrado');

        const passwordHash = await bcrypt.hash(password, 10);
        const user = await this.prisma.user.create({
            data: { email, passwordHash },
        });

        return this.signToken(user.id, user.email);
    }

    async login(email: string, password: string) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) throw new UnauthorizedException('Credenciais inválidas');

        const passwordMatches = await bcrypt.compare(password, user.passwordHash);
        if (!passwordMatches) throw new UnauthorizedException('Credenciais inválidas');

        return this.signToken(user.id, user.email);
    }

    private signToken(userId: number, email: string) {
        const payload = { sub: userId, email };
        return { accessToken: this.jwtService.sign(payload) };
    }
}