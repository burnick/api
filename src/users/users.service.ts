import { Injectable, BadRequestException } from '@nestjs/common';
//import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './models/user.models';

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

    const username = createUserInput.email.split('@');

    if (!username[0]) {
      throw new BadRequestException('Wrong Email Format');
    }

    return await this.prisma.user.create({
      data: {
        ...createUserInput,
        name: username[0],
        roles: {
          connectOrCreate: {
            where: { name: 'User' },
            create: { name: 'User' },
          },
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany({
      include: {
        roles: true, // Return all fields
      },
    });
  }

  async findOne(email: string): Promise<User> {
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
