import { Document } from 'mongoose';

export interface ITraining extends Document {
  readonly name: string;
  readonly date: number;
  readonly exercise: string[];
  readonly comment: string;
}
