// A
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
// C
import { CarsModule } from './handlers/cars/cars.module';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// D
// import { databaseProviders } from './database/database.providers';
// M
import { Module } from '@nestjs/common';
import { MailsModule } from './handlers/mails/mails.module';
// S
import { ScheduleModule } from '@nestjs/schedule';
import { SwaggerModule } from '@nestjs/swagger';



@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    CarsModule,
    MailsModule,
    SwaggerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    }],
})
export class AppModule {

}
