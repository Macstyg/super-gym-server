import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ExerciseSchema } from './schemas/exercise.schema';
import { ExercisesResolver } from './exercises.resolver';
import { ExercisesService } from './exercises.service';
import { TrainingExerciseSchema } from './schemas/trainingExercise.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Exercise', schema: ExerciseSchema },
      { name: 'TrainingExercise', schema: TrainingExerciseSchema },
    ]),
  ],
  providers: [ExercisesResolver, ExercisesService],
  exports: [ExercisesResolver, ExercisesService],
})
export class ExercisesModule { }
