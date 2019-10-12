import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { TrainingsModule } from './trainings/trainings.module';
import { ObjectIdScalar } from './scalars/ObjectId';

@Module({
  imports: [
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
        scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
      },
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/supergym', { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }),
    TrainingsModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
