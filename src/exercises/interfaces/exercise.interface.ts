import { Document } from 'mongoose';

export interface IExercise extends Document {
  readonly name: string;
  readonly date: number;
  readonly sets: string[];
  readonly comment: string;
  readonly measures: string[];
}
