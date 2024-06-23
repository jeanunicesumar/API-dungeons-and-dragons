import { HttpException, HttpStatus } from '@nestjs/common';

export class GeminiAPIError extends HttpException {
  constructor() {
    super(
      'Error to fetch data from Gemini API',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
