import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ExerciseSchema } from './schemas/exercise.schema';
import { ExercisesResolver } from './exercises.resolver';
import { ExercisesService } from './exercises.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Exercise', schema: ExerciseSchema }])],
  providers: [ExercisesResolver, ExercisesService],
})
export class ExercisesModule { }
