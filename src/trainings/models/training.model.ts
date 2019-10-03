import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class Training {
  @Field(type => ID)
  id!: string;

  @Field()
  name!: string;

  @Field()
  date!: string;

  @Field(type => [String])
  exercises: string[] = [];

  @Field()
  coment?: string;
}
