import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IExercise } from './interfaces/exercise.interface';
import { ExerciseInput } from './dto/new-exercise.input';
import { Exercise } from './models/exercise.model';

@Injectable()
export class ExercisesService {
  constructor(@InjectModel('Exercise') private readonly exerciseModel: Model<IExercise>) { }

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
