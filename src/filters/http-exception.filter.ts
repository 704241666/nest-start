import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  LoggerService,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExcetpionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    this.logger.error(exception.message, exception.stack);
    response.status(status).json({
      code: status,
      timestamp: new Date().toISOString(),
      // path: request.url,
      // method: request.method,
      message: exception.message || HttpException.name,
    });
    // throw new Error('Method not implemented.');
  }
}
