import { Injectable, NestMiddleware } from '@nestjs/common';
import { CustomLoggerService } from '../logger/custom-logger.service';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: CustomLoggerService) {}

  use(req: Request, res: Response, next: () => void): void {
    const { body } = req;
    this.logger.debug(`Request [url=${req.url}, method=${req.method}, body=${JSON.stringify(body)}]`);
    next();
  }
}
