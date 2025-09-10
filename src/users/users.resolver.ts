import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  // Subscription,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './models/user.models';
// /import { CreateUserInput } from './dto/create-user.input';
import { PubSubService } from '../pubSub.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private pubSubService: PubSubService,
  ) {}

  // create user is moved to SignUp
  // @Mutation(() => User, { name: 'createAUser' })
  // createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
  //   return this.usersService.create(createUserInput);
  // }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Query(() => [User], { name: 'findAllUsers' })
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Query(() => User, { name: 'findOneUser' })
  findOne(@Args('uuid') uuid: string) {
    return this.usersService.findOne(uuid);
  }

  // @Mutation(() => User, { name: 'updateAUser' })
  // @UseGuards(JwtAuthGuard)
  // @UseGuards(RolesGuard)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.usersService.update({ ...updateUserInput }, updateUserInput);
  // }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Mutation(() => User, { name: 'disableAUser' })
  async disableUser(@Args('uuid', { type: () => String }) uuid: string) {
    const result = await this.usersService.disable(uuid);
    if (result) {
      this.pubSubService.publish('totalNumberOfUsers', {
        totalNumberOfUsers: this.usersService.count(),
      });
    }
    return result;
  }
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Mutation(() => User, { name: 'removeAUsers' })
  removeUser(@Args('uuid', { type: () => Int }) uuid: string) {
    return this.usersService.remove({ uuid });
  }
}
