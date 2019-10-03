import { ObjectType, Field, Int } from 'type-graphql';
import { IsOptional } from 'class-validator';

@ObjectType()
export class ExerciseSet {
  @Field({ nullable: true })
  @IsOptional()
  mesurement?: string = 'kg';

  @Field(type => Int)
  reps: number = 0;

  @Field(type => String, { nullable: true })
  comment?: string;
}
