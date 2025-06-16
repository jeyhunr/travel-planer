import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // if the exception is an instance of HttpException, we handle it separately
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const message = exception.getResponse();

      response.status(status).json({
        statusCode: status,
        message,
        error: exception.name,
      });
      return;
    }

    // if there is an unknow error, we log it and send a generic error response
    Logger.error('Unknow error:', exception);

    response.status(400).json({
      statusCode: 400,
      message: 'Something went wrong.',
      error: 'Bad Request',
    });
  }
}
