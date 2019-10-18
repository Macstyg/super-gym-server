import { InputType, Field } from 'type-graphql';
import { ObjectId } from 'mongodb';

import { Exercise } from '../models/exercise.model';
import { ObjectIdScalar } from '../../scalars/ObjectId';
import { MuscleGroup } from '../../enums/MuscleGroup';
import { ExerciseSet } from '../models/exerciseSet.model';

@InputType()
export class ExerciseInput implements Partial<Exercise> {
  @Field(type => ObjectIdScalar, { nullable: true })
  id?: ObjectId;

  @Field()
  name?: string;

  @Field(type => MuscleGroup, { nullable: true })
  muscleGroup?: MuscleGroup;

  @Field(type => [String], { nullable: true })
  measures?: string[];

  // @Field(type => ExerciseSet)
  // sets?: ExerciseSet[];
}
