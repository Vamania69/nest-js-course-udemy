import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/common/db/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly db: PrismaService) {}

  private async hasPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async create(createUserInput: CreateUserInput): Promise<User> {
    console.log(createUserInput, 'createUserInput');
    return this.db.user.create({
      data: {
        email: createUserInput.email,
        password: await this.hasPassword(createUserInput.password),
      },
    });
  }

  async findAll(): Promise<User[]> {
    return this.db.user.findMany();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.db.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    if (updateUserInput?.password) {
      updateUserInput.password = await this.hasPassword(
        updateUserInput.password,
      );
    }
    return this.db.user.update({
      where: { id },
      data: {
        ...updateUserInput,
      },
    });
  }

  async remove(id: number): Promise<User> {
    return this.db.user.delete({
      where: { id },
    });
  }

  async verifyUser(email: string, password: string): Promise<User> {
    console.log(password, 'password');
    const user = await this.db.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      console.log('Password validation failed', {
        inputPassword: password,
        storedHash: user.password,
      });
      throw new UnauthorizedException('Credentials are not valid');
    }
    return user;
  }
}
