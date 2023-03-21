import { Args, Context, Int, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { PubSubService } from '../pubSub.service';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guard';
import { User } from 'src/users/models/user.models';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private pubSubService: PubSubService,
  ) {}
  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context,
  ) {
    return this.authService.login(context.user);
  }

  @Mutation(() => User)
  async signup(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    const result = await this.authService.signup(loginUserInput);
    if (result) {
      this.pubSubService.publish('totalNumberOfUsers', {
        totalNumberOfUsers: this.authService.count(),
      });
    }
    return result;
  }
}
