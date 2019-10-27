import { InputType, Field } from 'type-graphql';
import { IsOptional, MaxLength } from 'class-validator';
import { ObjectId } from 'mongodb';

import { Training } from '../models/training.model';
import { ObjectIdScalar } from '../../common/scalars/ObjectId';

@InputType()
export class TrainingInput implements Partial<Training> {
  @Field(type => ObjectIdScalar, { nullable: true })
  id?: ObjectId;

  @Field()
  @IsOptional()
  @MaxLength(30)
  name?: string;

  @Field()
  isActive?: boolean;

  @Field(type => [ObjectIdScalar], { nullable: true })
  exercises?: ObjectId[];
}
