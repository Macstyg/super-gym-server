import * as mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

export const TrainingExerciseSchema = new mongoose.Schema({
  name: String,
  sets: { type: [{ mesurement: String, reps: Number, comment: String }], default: [] },
  muscleGroup: String,
  comment: String,
  measures: { type: [String], default: ['Reps (count)', 'Weight (kg)'] },
  trainingId: ObjectId,
});
