import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateRestaurantInput {
  @Field(() => String, { description: 'Restaurant Name' })
  name: string;

  @Field()
  userId: number;
}
