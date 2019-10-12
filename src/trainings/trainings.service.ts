import { Injectable, NotFoundException } from '@nestjs/common';
import findIndex from 'lodash/fp/findIndex';
import find from 'lodash/fp/find';
import remove from 'lodash/fp/remove';

import { Training } from './models/training.model';
import { Exercise } from './models/exercise.model';
import { ExerciseSet } from './models/exerciseSet.model';
import { TrainingInput } from './dto/new-training.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITraining } from './interfaces/training.interface';
import { FindAndModifyWriteOpResultObject } from 'mongodb';

@Injectable()
export class TrainingsService {
  constructor(@InjectModel('Training') private readonly trainingModel: Model<ITraining>) { }

  async findOneById(id: string): Promise<ITraining | null> {
    return await this.trainingModel.findById(id).exec();
  }

  async findAll(): Promise<ITraining[]> {
    return await this.trainingModel.find().exec();
  }

  private async updateTraining({ id, name }: TrainingInput): Promise<ITraining | null> {
    const trainingToUpdate = this.trainingModel.findByIdAndUpdate(id, { name }, { upsert: true, new: true }).exec();
    return await trainingToUpdate as ITraining;
  }

  private async createTraining({ name }: TrainingInput): Promise<ITraining> {
    const newTrainingVM = new Training({ name });
    const newTraining = new this.trainingModel(newTrainingVM);
    return await newTraining.save();
  }

  async createOrUpdate(newTrainingData: TrainingInput): Promise<ITraining | null> {
    const { id } = newTrainingData;
    return id ? await this.updateTraining(newTrainingData) : await this.createTraining(newTrainingData);
  }

  async remove(id: string): Promise<any> {
    const result = await this.trainingModel.deleteOne({ _id: id }).exec();
    console.log('result', result);
    return result;
  }

  // async findOneExerciseById(id: string): Promise<Exercise> {
  //   const exercise = this.trainingModel
  //   if (!exercise) {
  //     throw new NotFoundException(id);
  //   }
  //   return await new Promise((res) => res(exercise));
  // }
}
