import { Logger as NestJsLogger } from '@nestjs/common';
import { QueryRunner, Logger as TypeOrmLogger } from 'typeorm';

export class DatabaseLogger implements TypeOrmLogger {
  private readonly logger = new NestJsLogger('sql');

  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    if (queryRunner?.data?.isCreatingLogs) {
      return;
    }
    this.logger.log(`${query}${this.stringifyParameters(parameters)}`);
  }

  logQueryError(error: string | Error, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    if (queryRunner?.data?.isCreatingLogs) {
      return;
    }
    this.logger.error(`${query}${this.stringifyParameters(parameters)} -- ${error}`);
  }

  logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    if (queryRunner?.data?.isCreatingLogs) {
      return;
    }
    this.logger.warn(`Time: ${time}${this.stringifyParameters(parameters)} -- ${query}`);
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    this.logger.log(message);
  }

  logMigration(message: string, queryRunner?: QueryRunner) {
    this.logger.log(message);
  }

  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner) {
    if (queryRunner?.data?.isCreatingLogs) {
      return;
    }
    if (level === 'log') {
      this.logger.log(message);
    }
    if (level === 'info') {
      this.logger.debug(message);
    }
    if (level === 'warn') {
      this.logger.warn(message);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private stringifyParameters(parameters?: unknown[]) {
    try {
      if (parameters) {
        return ` -- Param: ${JSON.stringify(parameters)}`;
      }
      return '';
    } catch {
      return '';
    }
  }
}
