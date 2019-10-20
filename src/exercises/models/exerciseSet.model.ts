import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
export class ExerciseSet {
  @Field({ nullable: true })
  mesurement?: string = 'Reps (count)';

  @Field(type => Int)
  reps: number = 0;

  @Field({ nullable: true })
  comment?: string;
}
