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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_service_1 = require("./user.service");
const user_entity_1 = require("./entities/user.entity");
const create_user_input_1 = require("./dto/create-user.input");
const update_user_input_1 = require("./dto/update-user.input");
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../auth/current-user.decorator");
const gql_jwt_guard_1 = require("../auth/guards/gql.jwt-guard");
let UserResolver = class UserResolver {
    constructor(userService) {
        this.userService = userService;
    }
    createUser(createUserInput) {
        return this.userService.create(createUserInput);
    }
    findAll() {
        return this.userService.findAll();
    }
    findOne(id) {
        return this.userService.findOne(id);
    }
    updateUser(updateUserInput, user) {
        return this.userService.update(user.id, updateUserInput);
    }
    removeUser(id) {
        return this.userService.remove(id);
    }
    getMe(user) {
        return user;
    }
};
exports.UserResolver = UserResolver;
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.User),
    __param(0, (0, graphql_1.Args)('createUserInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_input_1.CreateUserInput]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "createUser", null);
__decorate([
    (0, graphql_1.Query)(() => [user_entity_1.User], { name: 'users' }),
    (0, common_1.UseGuards)(gql_jwt_guard_1.GqlAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => user_entity_1.User, { name: 'user' }),
    (0, common_1.UseGuards)(gql_jwt_guard_1.GqlAuthGuard),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.User),
    (0, common_1.UseGuards)(gql_jwt_guard_1.GqlAuthGuard),
    __param(0, (0, graphql_1.Args)('updateUserInput')),
    __param(1, (0, current_user_decorator_1.currentUserDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_input_1.UpdateUserInput, Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "updateUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.User),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "removeUser", null);
__decorate([
    (0, graphql_1.Query)(() => user_entity_1.User, { name: 'me' }),
    (0, common_1.UseGuards)(gql_jwt_guard_1.GqlAuthGuard),
    __param(0, (0, current_user_decorator_1.currentUserDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "getMe", null);
exports.UserResolver = UserResolver = __decorate([
    (0, graphql_1.Resolver)(() => user_entity_1.User),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserResolver);
//# sourceMappingURL=user.resolver.js.map