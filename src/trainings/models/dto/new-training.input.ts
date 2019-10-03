import { InputType, Field } from 'type-graphql';
import { IsOptional, MaxLength } from 'class-validator';

import { Training } from '../training.model';

@InputType()
export class TrainingInput implements Partial<Training> {
  @Field()
  id!: string;

  @Field()
  @IsOptional()
  @MaxLength(30)
  name!: string;
}
