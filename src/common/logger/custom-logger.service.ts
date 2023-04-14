import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import { Injectable, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CustomLoggerService implements LoggerService {
  logger: winston.Logger;

  constructor(private configService: ConfigService) {
    const customFormat = winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss.SSS',
      }),
      winston.format.errors({ stack: true }),
      winston.format.printf(msg => `[${msg.timestamp}] [${msg.level}] ${msg.message}`),
    );
    const logger = winston.createLogger({
      format: customFormat,
    });

    if (configService.get<boolean>('LOG_ENABLE_CONSOLE', true)) {
      logger.add(
        new winston.transports.Console({
          level: configService.get<string>('LOG_LEVEL_CONSOLE', 'error'),
          format: winston.format.combine(winston.format.colorize(), customFormat),
        }),
      );
    }
    if (configService.get<boolean>('LOG_ENABLE_FILE', true)) {
      logger.add(
        new DailyRotateFile({
          level: configService.get<string>('LOG_LEVEL_FILE', 'error'),
          datePattern: 'YYYY-MM-DD',
          filename: 'application-%DATE%.log',
          dirname: configService.get<string>('LOG_FILE_DIR', 'logs'),
          maxSize: '10m',
          maxFiles: '30d',
        }),
      );
    }
    this.logger = logger;
  }

  log(message: string, context?: string) {
    this.logger.info(message);
  }

  error(message: string, stack?: string, context?: string) {
    this.logger.error(message);
  }

  warn(message: string, context?: string) {
    this.logger.warn(message);
  }

  debug(message: string, context?: string) {
    this.logger.debug(message);
  }

  verbose(message: string, context?: string) {
    this.logger.silly(message);
  }
}
