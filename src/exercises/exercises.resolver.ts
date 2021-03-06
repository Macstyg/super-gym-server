import { Resolver } from 'type-graphql';
import { NotFoundException } from '@nestjs/common';
import { Args, Query, Mutation } from '@nestjs/graphql';

import { Exercise } from './models/exercise.model';
import { IExercise } from './interfaces/exercise.interface';
import { ExercisesService } from './exercises.service';
import { ExerciseInput } from './dto/new-exercise.input';
import { TrainingExercise } from './models/trainingExercise.model';
import { ITrainingExercise } from './interfaces/trainingExercise.interface';
import { TrainingExerciseInput } from './dto/new-training-exercise.input';
import { TrainingsService } from '../trainings/trainings.service';
import { ITraining } from '../trainings/interfaces/training.interface';
import { UpsertTrainingExerciseResponse } from './types';
import { GetTrainingExercisesArgs } from './dto/get-training-exercises-args.input';
import { UpdateTrainingExerciseSetsInput } from './dto/update-training-exercise-sets.input';

@Resolver(of => Exercise)
export class ExercisesResolver {
  constructor(
    private readonly exerciseService: ExercisesService,
    private readonly trainingsService: TrainingsService,
  ) { }

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

  @Query(returns => [TrainingExercise])
  async getAllTrainingExercisesByTrainingId(@Args() { trainingId }: GetTrainingExercisesArgs): Promise<ITrainingExercise[]> {
    return this.exerciseService.findAllTrainingExercises({ trainingId });
  }

  @Mutation(returns => Exercise)
  async upsertExercise(@Args('newExerciseData') newExerciseData: ExerciseInput): Promise<IExercise | null> {
    return await this.exerciseService.createOrUpdate(newExerciseData);
  }

  @Mutation(returns => UpsertTrainingExerciseResponse)
  async upsertTrainingExercise(
    @Args('newTrainingExerciseData') newTrainingExerciseData: TrainingExerciseInput,
  ): Promise<{ trainingExercise: ITrainingExercise | null, training: ITraining | null }> {
    const updatedTrainingExercise = await this.exerciseService.upsertTrainingExercise(newTrainingExerciseData);
    if (!updatedTrainingExercise) {
      throw NotFoundException;
    }

    const updatedTraining = await this.trainingsService.createOrUpdate({
      id: newTrainingExerciseData.trainingId,
      exercises: [updatedTrainingExercise.id],
    });

    return {
      trainingExercise: updatedTrainingExercise,
      training: updatedTraining,
    };
  }

  @Mutation(returns => TrainingExercise)
  async updateTrainingExerciseSets(
    @Args('updateTrainingExerciseSetsInput') { trainingExerciseId, ...rest }: UpdateTrainingExerciseSetsInput,
  ): Promise<ITrainingExercise> {
    return await this.exerciseService.addSetToExercise(rest, trainingExerciseId);
  }
}
