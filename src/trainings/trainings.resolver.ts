import { Resolver } from 'type-graphql';
import { Args, Query, Mutation, ResolveProperty, Parent } from '@nestjs/graphql';
import { NotFoundException } from '@nestjs/common';

import { TrainingsService } from './trainings.service';
import { Training } from './models/training.model';
import { TrainingInput } from './dto/new-training.input';
import { Exercise } from '../exercises/models/exercise.model';
import { ITraining } from './interfaces/training.interface';
import { ExercisesService } from '../exercises/exercises.service';
import { TrainingExercise } from '../exercises/models/trainingExercise.model';

@Resolver(of => Training)
export class TrainingsResolver {
  constructor(
    private readonly trainingsService: TrainingsService,
    private readonly exercisesService: ExercisesService,
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

  // @ResolveProperty('exercises', returns => [String])
  // async getExercises(@Parent() training: Training) {
  //   const { id } = training;
  //   return await this.exercisesService.findAllTrainingExercises({ trainingId: id });
  // }
}
