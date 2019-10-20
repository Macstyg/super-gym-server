import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

import { Exercise } from '../../exercises/models/exercise.model';

export interface ITraining extends Document {
  readonly name: string;
  readonly date: number;
  readonly exercise: ObjectId[];
  readonly comment: string;
  readonly isActive: boolean;
}
