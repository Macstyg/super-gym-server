import { Document } from 'mongoose';

export interface IExercise extends Document {
  readonly name: string;
  readonly date: number;
  readonly comment: string;
  readonly measures: string[];
}
