import { Module } from '@nestjs/common';
import { WinstonModule, WinstonModuleOptions, utilities } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import * as config from 'config';
import { LoggerEnum } from '../../enum/config.enum';
const loggerConfig = config.get(LoggerEnum.LOGGER);
const consoleTransports = new winston.transports.Console({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    utilities.format.nestLike(),
  ),
});
const dailyRotateFileTransports = new winston.transports.DailyRotateFile({
  level: 'warn',
  dirname: 'logs',
  filename: 'application-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  format: winston.format.combine(
    winston.format.timestamp({
      format: () => new Date().toLocaleString(),
    }),
    winston.format.simple(),
  ),
});
const dailyInfoRotateFileTransports = new winston.transports.DailyRotateFile({
  level: loggerConfig[LoggerEnum.LOGGER_LEVEL],
  dirname: 'logs',
  filename: 'info-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  format: winston.format.combine(
    winston.format.timestamp({
      format: () => new Date().toLocaleString(),
    }),
    winston.format.simple(),
  ),
});
@Module({
  imports: [
    WinstonModule.forRootAsync({
      useFactory: () =>
        ({
          transports: [
            consoleTransports,
            ...(loggerConfig[LoggerEnum.LOGER_ON]
              ? [dailyRotateFileTransports, dailyInfoRotateFileTransports]
              : []),
          ],
        } as WinstonModuleOptions),
    }),
  ],
})
export class LogsModule {}
