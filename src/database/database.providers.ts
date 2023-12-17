import { DataSource } from 'typeorm';
import { cars } from '../entities/cars.entities';

export const databaseProviders = [
    {
        provide:'CARS_REPOSITORY',
        userFactory: (DataSource: DataSource) => DataSource.getRepository(cars),
        inject: ['DATA_SOURCE'],
    }
]