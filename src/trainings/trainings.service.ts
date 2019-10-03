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

  async update(newTrainingData: TrainingInput): Promise<Training> {
    const trainingToUpdate = find({ id: newTrainingData.id }, trainings)!;
    const idx = findIndex({ id: newTrainingData.id }, trainings);
    const updatedTraining = { ...trainingToUpdate, ...newTrainingData };
    trainings[idx] = updatedTraining;
    return await new Promise((res) => res(updatedTraining));
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
