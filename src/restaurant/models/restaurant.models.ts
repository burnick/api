import { ObjectType, Field } from '@nestjs/graphql';
import { BaseModel } from '../../common/models/base.models';
@ObjectType()
export class Restaurant extends BaseModel {
  @Field(() => String, { description: 'Restaurant Name' })
  name: number;
}
