import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TrainingsResolver } from './trainings.resolver';
import { TrainingsService } from './trainings.service';
import { TrainingSchema } from './schemas/training.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Training', schema: TrainingSchema }])],
  providers: [TrainingsResolver, TrainingsService],
})
export class TrainingsModule { }
