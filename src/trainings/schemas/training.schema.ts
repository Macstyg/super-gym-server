import * as mongoose from 'mongoose';
import { ExerciseSchema } from '../../exercises/schemas/exercise.schema';

export const TrainingSchema = new mongoose.Schema({
  name: String,
  date: Number,
  duration: Number,
  exercises: { type: [String], default: [] },
  comment: String,
  isActive: { type: Boolean, default: false },
});
