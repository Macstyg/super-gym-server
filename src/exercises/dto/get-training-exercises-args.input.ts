import { ArgsType, Field } from 'type-graphql';
import { ObjectId } from 'mongodb';
import { ObjectIdScalar } from '../../common/scalars/ObjectId';

@ArgsType()
export class GetTrainingExercisesArgs {
  @Field(type => ObjectIdScalar)
  trainingId!: ObjectId;
}
