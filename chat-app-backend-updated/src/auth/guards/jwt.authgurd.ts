import { AuthGuard } from '@nestjs/passport';

export class JwtGuard extends AuthGuard('jwt') {}  // this protect the routes 
