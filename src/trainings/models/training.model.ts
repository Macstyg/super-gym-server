import { ObjectType, Field, ID, Int, Float } from 'type-graphql';
import { ObjectId } from 'mongodb';
import { ObjectIdScalar } from '../../scalars/ObjectId';

@ObjectType()
export class Training {
  constructor({ name }: { name: string }) {
    this.name = name;
  }
  @Field(type => ObjectIdScalar)
  id: ObjectId = new ObjectId();

  @Field()
  name: string = '';

  @Field(type => Int, { nullable: true })
  duration: number = 0;

  @Field(type => Float)
  date: number = new Date().valueOf();

  @Field(type => [String], { nullable: true })
  exercises: string[] = [];

  @Field({ nullable: true })
  comment?: string;
}
