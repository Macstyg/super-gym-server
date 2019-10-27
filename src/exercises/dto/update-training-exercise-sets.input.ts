import { Field, Int, InputType } from 'type-graphql';
import { ObjectId } from 'mongodb';

import { ObjectIdScalar } from '../../common/scalars/ObjectId';

@InputType()
export class UpdateTrainingExerciseSetsInput {
  @Field(type => ObjectIdScalar)
  trainingExerciseId!: ObjectId;

  @Field()
  mesurement!: string;

  @Field(type => Int)
  reps: number = 0;

  @Field({ nullable: true })
  comment?: string;
}
