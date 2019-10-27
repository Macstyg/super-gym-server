import { InputType, Field } from 'type-graphql';
import { ObjectId } from 'mongodb';

import { ObjectIdScalar } from '../../common/scalars/ObjectId';
import { MuscleGroup } from '../../common/enums/MuscleGroup';
import { TrainingExercise } from '../models/trainingExercise.model';

@InputType()
export class TrainingExerciseInput implements Partial<TrainingExercise> {
  @Field(type => ObjectIdScalar, { nullable: true })
  id?: ObjectId;

  @Field(type => ObjectIdScalar)
  trainingId!: ObjectId;

  @Field()
  name?: string;

  @Field(type => MuscleGroup, { nullable: true })
  muscleGroup?: MuscleGroup;

  @Field(type => [String], { nullable: true })
  measures?: string[];
}
