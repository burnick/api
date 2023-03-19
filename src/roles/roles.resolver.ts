import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RolesService } from './roles.service';
import { Role } from './models/role.models';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { RolesGuard } from 'src/auth/roles.guard';

@Resolver(() => Role)
export class RolesResolver {
  constructor(private readonly rolesService: RolesService) {}

  @Mutation(() => Role)
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  createRole(@Args('createRoleInput') createRoleInput: CreateRoleInput) {
    return this.rolesService.create(createRoleInput);
  }

  @Query(() => [Role], { name: 'findAllRoles' })
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  findAll() {
    return this.rolesService.findAll();
  }

  @Query(() => Role, { name: 'fineOneRole' })
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.rolesService.findOne(id);
  }

  @Mutation(() => Role)
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  updateRole(@Args('updateRoleInput') updateRoleInput: UpdateRoleInput) {
    return this.rolesService.update(updateRoleInput.id, updateRoleInput);
  }

  @Mutation(() => Role, { name: 'deleteRole' })
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  removeRole(@Args('id', { type: () => Int }) id: number) {
    return this.rolesService.remove(id);
  }
}
