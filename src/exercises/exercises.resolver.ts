import { Resolver } from 'type-graphql';
import { NotFoundException } from '@nestjs/common';
import { Args, Query, Mutation } from '@nestjs/graphql';

import { Exercise } from './models/exercise.model';
import { IExercise } from './interfaces/exercise.interface';
import { ExercisesService } from './exercises.service';
import { ExerciseInput } from './dto/new-exercise.input';

@Resolver(of => Exercise)
export class ExercisesResolver {
  constructor(private readonly exerciseService: ExercisesService) { }

  @Query(returns => Exercise, { name: 'exercise' })
  async getExercise(@Args('id') id: string): Promise<IExercise> {
    const exercise = await this.exerciseService.findOneById(id);
    if (!exercise) {
      throw new NotFoundException();
    }
    return exercise;
  }

  @Query(returns => [Exercise], { name: 'exercises' })
  async getExercises(): Promise<IExercise[]> {
    return this.exerciseService.findAll();
  }

  @Mutation(returns => Exercise)
  async upsertExercise(@Args('newExerciseData') newExerciseData: ExerciseInput): Promise<IExercise | null> {
    return await this.exerciseService.createOrUpdate(newExerciseData);
  }
}
