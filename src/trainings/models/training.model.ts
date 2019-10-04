import { ObjectType, Field, ID } from 'type-graphql';
import uuid from 'uuid';

@ObjectType()
export class Training {
  constructor({ name }: { name: string }) {
    this.name = name;
  }
  @Field(type => ID)
  id: string = uuid();

  @Field()
  name: string = '';

  @Field()
  date: string = new Date().toISOString();

  @Field(type => [String])
  exercises: string[] = [];

  @Field({ nullable: true })
  coment?: string;
}
