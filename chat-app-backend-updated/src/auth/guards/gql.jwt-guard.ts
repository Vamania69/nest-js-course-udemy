import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from '../auth.service';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const token = request.cookies['Authentication_Cookie']; // Adjust based on how you store the token
    console.log(token, '-----------token');
    const user = await this.authService.validateToken(token); // Validate the token
    console.log(user, '------user');

    if (!user) {
      return false; // If the token is invalid, deny access
    }

    // Optionally, you can attach the user to the request object
    request.user = user;
    return true; // Allow access if the token is valid
  }
}
