import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './users/user.module';
import { TrainingsModule } from './trainings/trainings.module';

@Module({
  imports: [
    UserModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
    TrainingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
