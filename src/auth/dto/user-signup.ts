import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, Length } from 'class-validator';
@InputType()
export class UserSignupInput {
  @IsEmail()
  @Field({ nullable: false })
  username: string;

  @Length(5, 30)
  @Field({ nullable: false })
  password: string;
}
