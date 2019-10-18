import { registerEnumType } from 'type-graphql';

export enum MuscleGroup {
  Abs = 'Abs',
  Back = 'Back',
  Biceps = 'Biceps',
  Chest = 'Chest',
  Forearm = 'Forearm',
  LowerLeg = 'Lower leg',
  Shoulder = 'Shoulder',
  Triceps = 'Triceps',
}

registerEnumType(MuscleGroup, {
  name: 'MuscleGroup',
});
