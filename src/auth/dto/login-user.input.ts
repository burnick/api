import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginUserInput {
  //   @Field()
  //   access_token: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
