import { HttpException, HttpStatus } from '@nestjs/common';

export class DuplicatedUser extends HttpException {
  constructor() {
    super('User already exists', HttpStatus.BAD_REQUEST);
  }
}
