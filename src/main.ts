import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { CustomLoggerService } from 'src/common/logger/custom-logger.service';
import { AppModule } from 'src/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3000;
  const swaggerOptions = new DocumentBuilder()
    .setTitle('Boilerplate on NestJS')
    .setDescription('Boilerplate on NestJS for personal use')
    .setVersion('1.0')
    .addTag('My NestJS')
    .addBearerAuth()
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api', app, swaggerDocument);

  app.useLogger(app.get(CustomLoggerService));
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
}
bootstrap();
