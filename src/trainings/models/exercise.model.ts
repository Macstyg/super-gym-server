import { ObjectType, Field, ID } from 'type-graphql';
import { ExerciseSet } from './exerciseSet.model';
import { ObjectId } from 'mongodb';
import { ObjectIdScalar } from '../../scalars/ObjectId';

@ObjectType()
export class Exercise {
  @Field(type => ObjectIdScalar)
  id!: ObjectId;

  @Field()
  name!: string;

  @Field(type => ExerciseSet)
  sets?: ExerciseSet[];
}
