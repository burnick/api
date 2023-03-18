import 'reflect-metadata';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseModel } from '../../common/models/base.models';
//import { Role } from 'src/roles/entities/role.entity';

@ObjectType()
export class Role extends BaseModel {
  @Field(() => String, { nullable: false })
  name: string;
}
