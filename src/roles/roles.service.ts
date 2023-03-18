import { Injectable } from '@nestjs/common';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { PrismaService } from '../prisma.service';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  create(createRoleInput: CreateRoleInput) {
    return this.prisma.role.create({
      data: {
        ...createRoleInput,
      },
    });
  }

  findAll() {
    return this.prisma.role.findMany();
  }

  findOne(id: number) {
    return this.prisma.role.findFirstOrThrow({
      where: {
        id,
      },
    });
  }

  update(id: number, updateRoleInput: UpdateRoleInput) {
    return `This action updates a #${id} role`;
  }

  async remove(id: number) {
    const deleteRole = await this.prisma.role.findUniqueOrThrow({
      where: {
        id,
      },
    });
    if (!deleteRole) {
      throw new Error('Role not found');
    }

    return this.prisma.role.delete({
      where: {
        id,
      },
    });
  }
}
