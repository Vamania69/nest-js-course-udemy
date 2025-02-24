import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaModule } from '../common/db/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { GqlAuthGuard } from 'src/auth/guards/gql.jwt-guard';

@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule)],
  providers: [UserResolver, UserService, GqlAuthGuard],
})
export class UserModule {}
