import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { CustomLoggerService } from 'src/common/logger/custom-logger.service';
import { AppModule } from 'src/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3000;
  app.useLogger(app.get(CustomLoggerService));
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
}
bootstrap();
