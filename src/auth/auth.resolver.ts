import {
  Args,
  Context,
  Mutation,
  Resolver,
  // Subscription,
} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guard';
import { User } from 'src/users/models/user.models';
// import { PubSub } from 'graphql-subscriptions';

// const pubSub = new PubSub();

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}
  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context,
  ) {
    return this.authService.login(context.user);

    // pubSub.publish('totalNumberOfUsers', {
    //   totalNumberOfUsers: 0,
    // });
  }

  @Mutation(() => User)
  signup(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.authService.signup(loginUserInput);
  }

  // @Subscription(() => User, { name: 'totalNumberOfUsers' })
  // totalNumberOfUsers() {
  //   return pubSub.asyncIterator('totalNumberOfUsers');
  // }
}
