import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { UpdateRestaurantInput } from './dto/update-restaurant.input';

@Injectable()
export class RestaurantService {
  constructor(private prisma: PrismaService) {}

  create(createRestaurantInput: CreateRestaurantInput) {
    return this.prisma.restaurant.create({
      data: {
        ...createRestaurantInput,
      },
    });
  }

  async findAll() {
    return await this.prisma.restaurant.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} restaurant`;
  }

  update(id: number, updateRestaurantInput: UpdateRestaurantInput) {
    return `This action updates a #${id} restaurant`;
  }

  remove(id: number) {
    return `This action removes a #${id} restaurant`;
  }
}
