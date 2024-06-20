import { Log } from './schema/log.schema';
import { LogService } from './log.service';
import { Controller, Get } from '@nestjs/common';

@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get()
  async getLog(): Promise<Log[]> {
    return this.logService.getLog();
  }
}