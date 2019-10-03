import { ObjectType, Field } from 'type-graphql';
import { ExerciseSet } from './exerciseSet.model';

@ObjectType()
export class Exercise {
  @Field()
  id!: string;

  @Field()
  name!: string;

  @Field(type => ExerciseSet)
  sets?: ExerciseSet[];
}
