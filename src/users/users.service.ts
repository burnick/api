import { Injectable, BadRequestException } from '@nestjs/common';
//import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(createUserInput: CreateUserInput) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: createUserInput.email,
      },
    });
    if (user) {
      throw new BadRequestException('Existing User');
    }
    return await this.prisma.user.create({
      data: {
        ...createUserInput,
      },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(email: string) {
    return await this.prisma.user.findUniqueOrThrow({
      where: {
        email,
      },
    });
  }

  update(where: { id: number }, updateUserInput: UpdateUserInput) {
    return this.prisma.user.update({
      where,
      data: {
        ...updateUserInput,
        updatedAt: new Date(),
      },
    });
  }

  remove(userRemove: { id: number }) {
    return this.prisma.user.delete({
      where: userRemove,
    });
  }
}
