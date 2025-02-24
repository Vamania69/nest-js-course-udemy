import { Response } from 'express';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    login({ email, password }: {
        email: string;
        password: string;
    }, response: Response): Promise<void>;
    logout(response: Response): Promise<void>;
}
