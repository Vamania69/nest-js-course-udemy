"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../common/db/prisma.service");
let UserService = class UserService {
    constructor(db) {
        this.db = db;
    }
    async hasPassword(password) {
        return await bcrypt.hash(password, 10);
    }
    async create(createUserInput) {
        console.log(createUserInput, 'createUserInput');
        return this.db.user.create({
            data: {
                email: createUserInput.email,
                password: await this.hasPassword(createUserInput.password),
            },
        });
    }
    async findAll() {
        return this.db.user.findMany();
    }
    async findOne(id) {
        const user = await this.db.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
    async update(id, updateUserInput) {
        if (updateUserInput?.password) {
            updateUserInput.password = await this.hasPassword(updateUserInput.password);
        }
        return this.db.user.update({
            where: { id },
            data: {
                ...updateUserInput,
            },
        });
    }
    async remove(id) {
        return this.db.user.delete({
            where: { id },
        });
    }
    async verifyUser(email, password) {
        console.log(password, 'password');
        const user = await this.db.user.findUnique({ where: { email } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log('Password validation failed', {
                inputPassword: password,
                storedHash: user.password,
            });
            throw new common_1.UnauthorizedException('Credentials are not valid');
        }
        return user;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map