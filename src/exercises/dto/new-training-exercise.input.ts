import { InputType, Field } from 'type-graphql';
import { ObjectId } from 'mongodb';

import { Exercise } from '../models/exercise.model';
import { ObjectIdScalar } from '../../scalars/ObjectId';
import { MuscleGroup } from '../../enums/MuscleGroup';
import { ExerciseSet } from '../models/exerciseSet.model';
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

  @Field(type => [ObjectIdScalar])
  sets: ObjectId[] = [];

  // @Field(type => ExerciseSet)
  // sets?: ExerciseSet[];
}
