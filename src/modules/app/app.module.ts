import { Global, Logger, Module } from '@nestjs/common';
import { UserModule } from 'src/modules/user/user.module';
import { LogsModule } from 'src/modules/logs/logs.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from 'src/filters/all-excepttion.filter';
@Global()
@Module({
  imports: [UserModule, LogsModule],
  controllers: [],
  providers: [Logger, { provide: APP_FILTER, useClass: AllExceptionFilter }],
  exports: [Logger],
})
export class AppModule {}
