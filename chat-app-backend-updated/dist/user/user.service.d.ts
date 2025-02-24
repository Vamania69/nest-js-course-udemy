import { PrismaService } from 'src/common/db/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
export declare class UserService {
    private readonly db;
    constructor(db: PrismaService);
    private hasPassword;
    create(createUserInput: CreateUserInput): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, updateUserInput: UpdateUserInput): Promise<User>;
    remove(id: number): Promise<User>;
    verifyUser(email: string, password: string): Promise<User>;
}
