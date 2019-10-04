import { ObjectType, Field, ID } from 'type-graphql';
import { ExerciseSet } from './exerciseSet.model';

@ObjectType()
export class Exercise {
  @Field(type => ID)
  id!: string;

  @Field()
  name!: string;

  @Field(type => ExerciseSet)
  sets?: ExerciseSet[];
}
