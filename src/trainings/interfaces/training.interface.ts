import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface ITraining extends Document {
  readonly name: string;
  readonly date: number;
  readonly exercise: ObjectId[];
  readonly comment: string;
  readonly isActive: boolean;
}
