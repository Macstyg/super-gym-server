import { registerEnumType } from 'type-graphql';

export enum MuscleGroup {
  ABS = 'Abs',
  BACK = 'Back',
  BICEPS = 'Biceps',
  CHEST = 'Chest',
  FOREARM = 'Forearm',
  LOWER_LEG = 'Lower leg',
  SHOULDER = 'Shoulder',
  TRICEPS = 'Triceps',
}

registerEnumType(MuscleGroup, {
  name: 'MuscleGroup',
});
