import { ObjectType, Field } from 'type-graphql';
import { TrainingExercise } from './models/trainingExercise.model';
import { Training } from '../trainings/models/training.model';

@ObjectType()
export class UpsertTrainingExerciseResponse {
  @Field(type => TrainingExercise)
  trainingExercise!: TrainingExercise | null;

  @Field(type => Training)
  training!: Training | null;
}
