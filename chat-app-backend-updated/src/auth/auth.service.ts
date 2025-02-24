import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { Response } from 'express';
import { tokenPayload } from './interfaces/jwt-token';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(user: User, response: Response) {
    const expires = new Date();
    const secret = this.configService.getOrThrow('JWT_SECRET');
    const expiration = this.configService.getOrThrow('JWT_EXPIRATION');
    console.log('JWT_SECRET:', secret);
    console.log('JWT_EXPIRATION:', expiration);
    expires.setSeconds(
      expires.getSeconds() + this.configService.getOrThrow('JWT_EXPIRATION'),
    );

    const tokenPayload: tokenPayload = {
      id: user.id,
      email: user.email,
    };

    const token = this.jwtService.sign(tokenPayload);
    console.log(token, 'token');
    response.cookie('Authentication_Cookie', token, {
      httpOnly: true,
      expires: expires,
    });
  }

  async validateToken(token: string): Promise<tokenPayload | null> {
    try {
      const decoded = this.jwtService.verify(token); // Verify the token
      const user = await this.userService.findOne(decoded.id); // Fetch user from the database

      if (!user) {
        return null; // User does not exist, return null
      }

      return decoded as tokenPayload; // Return the decoded payload if user exists
    } catch (error) {
      console.error('Token validation error:', error);
      return null; // Return null if the token is invalid
    }
  }

  async logout(response: Response) {
    response.cookie('Authentication_Cookie', '', {
      httpOnly: true,
      expires:new Date()
    });
  }
}
