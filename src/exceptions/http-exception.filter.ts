import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
@Catch(HttpException, mongoose.Error.CastError)
export default class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof HttpException) {
      return response
        .status(exception.getStatus())
        .json(exception.getResponse());
    }

    if (exception instanceof mongoose.Error.CastError) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: exception.message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Internal Server Error',
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
