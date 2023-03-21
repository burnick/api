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

  // This is moved to SignUp
  // @Mutation(() => User, { name: 'createAUser' })
  // createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
  //   return this.usersService.create(createUserInput);
  // }

  @Query(() => [User], { name: 'findAllUsers' })
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'findOneUser' })
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  findOne(@Args('uuid') uuid: string) {
    return this.usersService.findOne(uuid);
  }

  // @Mutation(() => User, { name: 'updateAUser' })
  // @UseGuards(JwtAuthGuard)
  // @UseGuards(RolesGuard)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.usersService.update({ ...updateUserInput }, updateUserInput);
  // }

  @Mutation(() => User, { name: 'disableAUser' })
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  async disableUser(@Args('uuid', { type: () => String }) uuid: string) {
    const result = await this.usersService.disable(uuid);
    if (result) {
      this.pubSubService.publish('totalNumberOfUsers', {
        totalNumberOfUsers: this.usersService.count(),
      });
    }
    return result;
  }

  @Mutation(() => User, { name: 'removeAUsers' })
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  removeUser(@Args('uuid', { type: () => Int }) uuid: string) {
    return this.usersService.remove({ uuid });
  }
}
