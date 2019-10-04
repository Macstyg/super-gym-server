import { Injectable, NotFoundException } from '@nestjs/common';
import findIndex from 'lodash/fp/findIndex';
import find from 'lodash/fp/find';
import remove from 'lodash/fp/remove';

import { Training } from './models/training.model';
import { Exercise } from './models/exercise.model';
import { ExerciseSet } from './models/exerciseSet.model';
import { TrainingInput } from './models/dto/new-training.input';

const sets: ExerciseSet[] = [
  { mesurement: 'kg', reps: 10 },
  { mesurement: 'kg', reps: 8 },
  { mesurement: 'kg', reps: 7 },
];

const exercises: Exercise[] = [
  {
    id: '1',
    name: 'Push ups',
    sets,
  },
  {
    id: '2',
    name: 'Abs',
    sets: [
      { reps: 15 },
      { reps: 15 },
      { reps: 15 },
    ],
  },
];

const trainings: Training[] = [
  {
    id: '1',
    name: 'My first training',
    date: new Date().toISOString(),
    exercises: ['1', '2'],
    coment: 'comments',
  },
];

@Injectable()
export class TrainingsService {
  async findOneById(id: string): Promise<Training | undefined> {
    return await new Promise((res) => res(find({ id }, trainings)));
  }

  async findAll(): Promise<Training[]> {
    return await new Promise((res) => res(trainings));
  }

  private updateTraining({ id, name }: TrainingInput): Promise<Training> {
    const trainingToUpdate = find({ id }, trainings)!;
    const idx = findIndex({ id }, trainings);
    const updatedTraining = { ...trainingToUpdate, name };
    trainings[idx] = updatedTraining;
    return new Promise((res) => res(updatedTraining));
  }

  private createTraining({ name }: TrainingInput): Promise<Training> {
    const newTraining = new Training({ name });
    trainings.push(newTraining);
    return new Promise((res) => res(newTraining));
  }

  async createOrUpdate(newTrainingData: TrainingInput): Promise<Training> {
    const { id } = newTrainingData;
    return id ? await this.updateTraining(newTrainingData) : await this.createTraining(newTrainingData);
  }

  async remove(id: string): Promise<boolean> {
    remove({ id }, trainings);
    return await new Promise((res) => res(true));
  }

  async findOneExerciseById(id: string): Promise<Exercise> {
    const exercise = find({ id }, exercises);
    if (!exercise) {
      throw new NotFoundException(id);
    }
    return await new Promise((res) => res(exercise));
  }
}
