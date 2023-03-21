import { Int, Resolver, Subscription } from '@nestjs/graphql';
import { PubSubService } from './pubSub.service';

@Resolver()
export class EventResolver {
  constructor(private pubSubService: PubSubService) {}

  @Subscription(() => Int, { name: 'totalNumberOfUsers' })
  totalNumberOfUsers() {
    return this.pubSubService.asyncIterator('totalNumberOfUsers');
  }
}
