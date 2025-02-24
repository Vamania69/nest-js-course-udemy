import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { PrismaService } from 'src/common/db/prisma.service';
export declare class ChatService {
    private readonly db;
    constructor(db: PrismaService);
    create(createChatInput: CreateChatInput, userId: number): Promise<string>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateChatInput: UpdateChatInput): string;
    remove(id: number): string;
}
