import { InputType, Field, ID } from 'type-graphql';
import { MaxLength, IsOptional } from 'class-validator';

import { User } from '../models/user';

@InputType()
export class UserInput implements Partial<User> {
  @Field(type => ID)
  id!: string;

  @Field()
  @IsOptional()
  @MaxLength(30)
  name!: string;

  @Field()
  @IsOptional()
  @MaxLength(30)
  surname!: string;
}
