import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
@InputType()
export class UserSignupInput {
  @IsEmail()
  @Field({ nullable: false })
  username: string;

  @Field({ nullable: false })
  password: string;
}
