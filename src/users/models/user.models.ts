import 'reflect-metadata';
import { ObjectType, HideField, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { BaseModel } from '../../common/models/base.models';
import { Role } from 'src/roles/models/role.models';

@ObjectType()
export class User extends BaseModel {
  @Field()
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: true })
  address?: string;

  @Field(() => String, { nullable: false })
  name?: string;

  @HideField()
  password: string;

  @Field(() => [Role], { nullable: true })
  roles?: Role[];
}
