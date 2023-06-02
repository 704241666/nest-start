import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Inject,
  LoggerService,
  UseFilters,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import * as requestIp from 'request-ip';
import { MongoError } from 'mongodb';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
/**
 * 捕获mongodb 错误
 */
@Catch(MongoError)
export class DbserverFilter<T> implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {}
  catch(exception: T, host: ArgumentsHost) {
    let errorMessage;
    if (exception instanceof MongoError) {
      errorMessage = exception.message;
    }
    // return { errorMessage };
    // this.logger.error(errorMessage);
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    this.logger.error(errorMessage);

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      url: request.originalUrl,
      Headers: request.headers,
      query: request.query,
      body: request.body,
      params: request.params,
      timestamp: new Date().toLocaleString(),
      ip: requestIp.getClientIp(request),
      exception: exception['name'],
      status: httpStatus,
      error: exception['response'] || 'Internal Server Error',
    };
    this.logger.error(responseBody);
    response.status(500).json({
      code: 500,
      message: errorMessage,
      responseBody,
    });
    // httpAdapter.reply(response, responseBody, httpStatus);
  }
}

export function dbSreverDecorator() {
  return UseFilters(DbserverFilter);
}
