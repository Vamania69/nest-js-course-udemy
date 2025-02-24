import {
  Body,
  Controller,
  Post,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { GqlAuthGuard } from './guards/gql.jwt-guard';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  // @Post('/login')
  // @UseGuards(LocalAuthGuard)
  // async login(
  //   @currentUserDecorator() user: User, // custom decorator for the input
  //   @Res({ passthrough: true }) response: Response, // need to understand
  // ) {
  //   try {
  //     const isUser = await this.userService.verifyUser(
  //       user.email,
  //       user.password,
  //     );
  //     return this.authService.login(isUser, response);
  //   } catch (error) {
  //     console.error('Login error:', error);
  //     throw new UnauthorizedException('Invalid credentials');
  //   }
  // }
  @Post('/login')
  @UseGuards(LocalAuthGuard)
  async login(
    @Body() { email, password }: { email: string; password: string }, // Use request instead of custom decorator
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      const user = await this.userService.verifyUser(email, password);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      return this.authService.login(user, response);
    } catch (error) {
      console.error('Login error:', error);
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  @Post('/logout')
  @UseGuards(GqlAuthGuard)
  async logout(@Res({ passthrough: true }) response: Response) {
    return this.authService.logout(response);
  }
}
