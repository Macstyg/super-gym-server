import { Resolver } from 'type-graphql';
import { Args, Query, Mutation } from '@nestjs/graphql';
import { NotFoundException } from '@nestjs/common';

import { TrainingsService } from './trainings.service';
import { Training } from './models/training.model';
import { TrainingInput } from './dto/new-training.input';
import { ITraining } from './interfaces/training.interface';

@Resolver(of => Training)
export class TrainingsResolver {
  constructor(
    private readonly trainingsService: TrainingsService,
  ) { }

  @Query(returns => Training, { name: 'training' })
  async getTraining(@Args('id') id: string): Promise<ITraining> {
    const training = await this.trainingsService.findOneById(id);
    if (!training) {
      throw new NotFoundException(id);
    }
    return training;
  }

  @Query(returns => [Training], { name: 'trainings' })
  async getTrainings(): Promise<ITraining[]> {
    const trainings = await this.trainingsService.findAll();
    if (!trainings) {
      throw new NotFoundException();
    }
    return trainings;
  }

  @Mutation(returns => Training)
  async upsertTraining(@Args('newTrainingData') newTrainingData: TrainingInput): Promise<ITraining | null> {
    return await this.trainingsService.createOrUpdate(newTrainingData);
  }

  @Mutation(returns => Boolean)
  async removeTraining(@Args('id') id: string): Promise<boolean> {
    return this.trainingsService.remove(id);
  }
}
