import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantResolver } from './restaurant.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [RestaurantResolver, RestaurantService, PrismaService],
})
export class RestaurantModule {}
