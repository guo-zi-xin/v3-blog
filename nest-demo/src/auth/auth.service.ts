import { Injectable, UnauthorizedException } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { LoginDto } from './dto/login.dto';

export interface JwtPayload {
  sub: string;
  username: string;
  role: string;
}

@Injectable()
export class AuthService {
  private get adminUsername(): string {
    return process.env.ADMIN_USERNAME ?? 'admin';
  }

  private get adminPassword(): string {
    return process.env.ADMIN_PASSWORD ?? 'admin123';
  }

  private get jwtSecret(): string {
    return process.env.JWT_SECRET ?? 'dev-secret-change-me';
  }

  login(dto: LoginDto) {
    if (
      dto.username !== this.adminUsername ||
      dto.password !== this.adminPassword
    ) {
      throw new UnauthorizedException('用户名或密码错误');
    }

    const payload: JwtPayload = {
      sub: 'admin',
      username: this.adminUsername,
      role: 'admin',
    };

    return {
      token: jwt.sign(payload, this.jwtSecret, { expiresIn: '7d' }),
      username: this.adminUsername,
    };
  }

  verify(token: string): JwtPayload {
    try {
      return jwt.verify(token, this.jwtSecret) as JwtPayload;
    } catch {
      throw new UnauthorizedException('登录已过期，请重新登录');
    }
  }
}
