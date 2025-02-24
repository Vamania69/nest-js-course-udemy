import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { tokenPayload } from 'src/auth/interfaces/jwt-token';
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    createUser(createUserInput: CreateUserInput): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    updateUser(updateUserInput: UpdateUserInput, user: tokenPayload): Promise<User>;
    removeUser(id: number): Promise<User>;
    getMe(user: tokenPayload): tokenPayload;
}
