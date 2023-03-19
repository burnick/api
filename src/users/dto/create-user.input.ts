import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsDate, Length } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Length(10, 20)
  @Field()
  name: string;

  @IsEmail()
  @Field({ nullable: false })
  email: string;

  @Length(5, 30)
  @Field({ nullable: false })
  password: string;

  @Field({ nullable: true })
  address?: string;

  @IsDate()
  @Field({ nullable: true })
  updatedAt?: Date;
}
