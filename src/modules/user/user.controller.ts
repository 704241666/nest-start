import { Controller, Get, Logger } from '@nestjs/common';
import { ConfigEnum, LoggerEnum } from 'src/enum/config.enum';
import * as config from 'config';
@Controller('user')
export class UserController {
  constructor(private readonly logger: Logger) {}
  @Get()
  getUsers(): any {
    this.logger.log(config.get(LoggerEnum.LOGGER));
    this.logger.warn('warn');
    this.logger.error('error');

    return {
      status: 1,
    };
  }
}
