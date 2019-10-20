import { ObjectType, Field, ID, Int, Float } from 'type-graphql';
import { ObjectId } from 'mongodb';
import { ObjectIdScalar } from '../../common/scalars/ObjectId';
import { Exercise } from '../../exercises/models/exercise.model';

@ObjectType()
export class Training {
  constructor({ name, isActive }: any) {
    this.name = name;
    this.isActive = isActive;
  }
  @Field(type => ObjectIdScalar)
  id: ObjectId = new ObjectId();

  @Field()
  name: string = '';

  @Field(type => Int, { nullable: true })
  duration: number = 0;

  @Field(type => Float)
  date: number = new Date().valueOf();

  @Field(type => [ObjectIdScalar], { nullable: true })
  exercises: ObjectId[] = [];

  @Field({ nullable: true })
  comment?: string;

  @Field()
  isActive: boolean = false;
}
