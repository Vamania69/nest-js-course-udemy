import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { Response } from 'express';
import { tokenPayload } from './interfaces/jwt-token';
import { UserService } from '../user/user.service';
export declare class AuthService {
    private readonly configService;
    private readonly jwtService;
    private readonly userService;
    constructor(configService: ConfigService, jwtService: JwtService, userService: UserService);
    login(user: User, response: Response): Promise<void>;
    validateToken(token: string): Promise<tokenPayload | null>;
    logout(response: Response): Promise<void>;
}
