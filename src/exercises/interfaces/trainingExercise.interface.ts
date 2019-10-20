import { Document } from 'mongoose';

export interface ITrainingExercise extends Document {
  readonly name: string;
  readonly date: number;
  readonly comment: string;
  readonly measures: string[];
  readonly sets: string[];
  readonly trainingId: string;
}
