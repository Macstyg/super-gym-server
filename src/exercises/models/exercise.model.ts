import { ObjectType, Field, Float } from 'type-graphql';
import { ObjectId } from 'mongodb';

import { ExerciseSet } from './exerciseSet.model';
import { ObjectIdScalar } from '../../scalars/ObjectId';
import { MuscleGroup } from '../../enums/MuscleGroup';

@ObjectType()
export class Exercise {
  constructor({ name, muscleGroup, measures }: any) {
    this.name = name;
    this.muscleGroup = muscleGroup;
    this.measures = measures;
  }
  @Field(type => ObjectIdScalar)
  id: ObjectId = new ObjectId();

  @Field()
  name: string = '';

  @Field(type => MuscleGroup, { nullable: true })
  muscleGroup?: MuscleGroup;

  @Field(type => ExerciseSet)
  sets?: ExerciseSet[];

  @Field(type => [String])
  measures: string[] = ['Reps (count)', 'Weight (kg)'];
}
