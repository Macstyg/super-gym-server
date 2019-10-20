import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

import { IExercise } from './interfaces/exercise.interface';
import { ExerciseInput } from './dto/new-exercise.input';
import { Exercise } from './models/exercise.model';
import { ITrainingExercise } from './interfaces/trainingExercise.interface';
import { TrainingExerciseInput } from './dto/new-training-exercise.input';
import { TrainingExercise } from './models/trainingExercise.model';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectModel('Exercise') private readonly exerciseModel: Model<IExercise>,
    @InjectModel('TrainingExercise') private readonly trainingExerciseModel: Model<ITrainingExercise>,
  ) { }

  async findOneById(id: string): Promise<IExercise | null> {
    const exercise = await this.exerciseModel.findById(id).exec();
    if (!exercise) {
      throw new NotFoundException(id);
    }
    return exercise;
  }

  async findAll(): Promise<IExercise[]> {
    return await this.exerciseModel.find().exec();
  }

  async createOrUpdate(newExerciseData: ExerciseInput): Promise<IExercise | null> {
    const { id } = newExerciseData;
    return id ? await this.updateExercise(newExerciseData) : await this.createExercise(newExerciseData);
  }

  async findAllTrainingExercises({ trainingId }: { trainingId: ObjectId }): Promise<ITrainingExercise[]> {
    const exercises = this.trainingExerciseModel.find({ trainingId });
    return await exercises.exec();
  }

  async upsertTrainingExercise(newTrainingExerciseData: TrainingExerciseInput): Promise<ITrainingExercise | null> {
    const { id } = newTrainingExerciseData;
    return id ? await this.updateTrainingExercise(newTrainingExerciseData) : await this.createTrainingExercise(newTrainingExerciseData);
  }

  private async updateTrainingExercise({ id, ...rest }: TrainingExerciseInput): Promise<ITrainingExercise | null> {
    const exerciseToUpdate = this.trainingExerciseModel.findByIdAndUpdate(id, rest, { upsert: true, new: true }).exec();
    return await exerciseToUpdate as ITrainingExercise;
  }

  private async createTrainingExercise(data: TrainingExerciseInput): Promise<ITrainingExercise> {
    const newTrainingExerciseVM = new TrainingExercise(data);
    const newTrainingExercise = new this.trainingExerciseModel(newTrainingExerciseVM);
    return await newTrainingExercise.save();
  }

  private async updateExercise({ id, ...rest }: ExerciseInput): Promise<IExercise | null> {
    const exerciseToUpdate = this.exerciseModel.findByIdAndUpdate(id, rest, { upsert: true, new: true }).exec();
    return await exerciseToUpdate as IExercise;
  }

  private async createExercise(data: ExerciseInput): Promise<IExercise> {
    const newExerciseVM = new Exercise(data);
    const newExercise = new this.exerciseModel(newExerciseVM);
    return await newExercise.save();
  }
}
