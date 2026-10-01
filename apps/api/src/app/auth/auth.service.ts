import {
    Injectable,
    UnauthorizedException,
    ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) {}

    async register(email: string, password: string) {
        const existing = await this.prisma.user.findUnique({
            where: { email },
        });

        if (existing) {
            throw new ConflictException('Email já cadastrado');
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await this.prisma.user.create({
            data: {
                email,
                passwordHash,
            },
        });

        return this.issueTokens(user.id, user.email);
    }

    async login(email: string, password: string) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const passwordMatches = await bcrypt.compare(
            password,
            user.passwordHash,
        );

        if (!passwordMatches) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        return this.issueTokens(user.id, user.email);
    }

    private signAccessToken(userId: number, email: string) {
        return this.jwtService.sign(
            {
                sub: userId,
                email,
            },
            {
                secret: process.env.JWT_ACCESS_SECRET,
                expiresIn: '15m',
            },
        );
    }

    private async signRefreshToken(userId: number, email: string) {
        const token = this.jwtService.sign(
            {
                sub: userId,
                email,
            },
            {
                secret: process.env.JWT_REFRESH_SECRET,
                expiresIn: '7d',
            },
        );

        const refreshTokenHash = await bcrypt.hash(token, 10);

        await this.prisma.user.update({
            where: { id: userId },
            data: { refreshTokenHash },
        });

        return token;
    }

    private async issueTokens(userId: number, email: string) {
        return {
            accessToken: this.signAccessToken(userId, email),
            refreshToken: await this.signRefreshToken(userId, email),
        };
    }

    async refresh(refreshToken: string) {
        let payload: {
            sub: number;
            email: string;
        };

        try {
            payload = this.jwtService.verify(refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET,
            });
        } catch {
            throw new UnauthorizedException(
                'Refresh token inválido ou expirado',
            );
        }

        const user = await this.prisma.user.findUnique({
            where: { id: payload.sub },
        });

        if (!user?.refreshTokenHash) {
            throw new UnauthorizedException();
        }

        const valido = await bcrypt.compare(
            refreshToken,
            user.refreshTokenHash,
        );

        if (!valido) {
            throw new UnauthorizedException();
        }

        return this.issueTokens(user.id, user.email);
    }

    async logout(userId: number) {
        await this.prisma.user.update({
            where: { id: userId },
            data: {
                refreshTokenHash: null,
            },
        });
    }
}