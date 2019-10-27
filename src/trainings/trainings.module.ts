import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TrainingsResolver } from './trainings.resolver';
import { TrainingsService } from './trainings.service';
import { TrainingSchema } from './schemas/training.schema';

@Global()
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Training', schema: TrainingSchema }])],
  providers: [TrainingsResolver, TrainingsService],
  exports: [TrainingsResolver, TrainingsService],
})
export class TrainingsModule { }
