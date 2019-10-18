import * as mongoose from 'mongoose';

export const TrainingSchema = new mongoose.Schema({
  name: String,
  date: Number,
  duration: Number,
  exercises: { type: [String], default: [] },
  comment: String,
});
