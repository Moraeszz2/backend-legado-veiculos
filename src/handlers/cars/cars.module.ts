import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { databaseProviders } from 'src/database.provider';

@Module({
  controllers: [CarsController],
  providers: [
    CarsService,
    ...databaseProviders
  ]
})
export class CarsModule {}
