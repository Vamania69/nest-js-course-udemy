import { ChatService } from './chat.service';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { User } from '@prisma/client';
export declare class ChatResolver {
    private readonly chatService;
    constructor(chatService: ChatService);
    createChat(createChatInput: CreateChatInput, user: User): Promise<string>;
    findAll(): string;
    findOne(id: number): string;
    updateChat(updateChatInput: UpdateChatInput): string;
    removeChat(id: number): string;
}
