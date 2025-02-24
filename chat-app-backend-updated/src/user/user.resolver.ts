import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
// import { gqlAuthGuard } from 'src/auth/guards/gql.jwt-guard';
import { currentUserDecorator } from 'src/auth/current-user.decorator';
import { tokenPayload } from 'src/auth/interfaces/jwt-token';
import { GqlAuthGuard } from 'src/auth/guards/gql.jwt-guard';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  @UseGuards(GqlAuthGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @currentUserDecorator() user: tokenPayload,
  ) {
    return this.userService.update(user.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }

  @Query(() => User, { name: 'me' })
  @UseGuards(GqlAuthGuard)
  getMe(@currentUserDecorator() user: tokenPayload) {
    return user;
  }
}
