import { Document } from 'mongoose';
import { ExerciseSet } from '../models/exerciseSet.model';

export interface ITrainingExercise extends Document {
  readonly name: string;
  readonly date: number;
  readonly comment: string;
  readonly measures: string[];
  readonly sets: ExerciseSet[];
  readonly trainingId: string;
}
