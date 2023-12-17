import { AppService } from './app.service';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: [
      'error',
      'warn',
      'debug',
      'verbose',
      'log'
    ],
  });

  app.useGlobalPipes(new ValidationPipe());

  const swagger = new DocumentBuilder()
    .setTitle('Legado Node API')
    .setDescription('Legado Node API Swagger')
    .setVersion(`1.0`)
    .build()

  const document = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('swagger', app, document);
    
  app.enableCors({
    origin: '*',
    methods:  'POST, HEAD, PUT, PATCH, GET, DELETE, OPTIONS',
    allowedHeaders: 'Conent-type, Accept, Authorization',
    credentials: true,
  });

  const appService = app.get(AppService);

  //Porta que esta rodando 
  await app.listen(5000);
}
bootstrap();
