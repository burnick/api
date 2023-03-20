import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './models/user.models';
// /import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

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

  @Mutation(() => User, { name: 'updateAUsers' })
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update({ ...updateUserInput }, updateUserInput);
  }

  @Mutation(() => User, { name: 'removeAUsers' })
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  removeUser(@Args('uuid', { type: () => Int }) uuid: string) {
    return this.usersService.remove({ uuid });
  }
}
