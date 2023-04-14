import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { CustomLoggerService } from 'src/common/logger/custom-logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  logger: CustomLoggerService;

  constructor(private readonly customLoggerService: CustomLoggerService) {
    this.logger = customLoggerService;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.logger.debug(`Start ${context.getClass().name} - ${context.getHandler().name}`);

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() =>
          this.logger.debug(`End ${context.getClass().name} - ${context.getHandler().name} [${Date.now() - now}ms]`),
        ),
      );
  }
}
