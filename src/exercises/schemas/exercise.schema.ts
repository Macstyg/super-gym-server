import * as mongoose from 'mongoose';

export const ExerciseSchema = new mongoose.Schema({
  name: String,
  sets: { type: [String], default: [] },
  muscleGroup: String,
  comment: String,
  measures: { type: [String], default: ['Reps (count)', 'Weight (kg)'] },
});
