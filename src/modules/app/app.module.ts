import { Global, Logger, Module } from '@nestjs/common';
import { UserModule } from '../../modules/user/user.module';
import { LogsModule } from '../../modules/logger/logs.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from '../../filters/all-excepttion.filter';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { IdsModule } from '../ids/ids.module';
import { RolesModule } from '../roles/roles.module';
@Global()
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:123456@localhost:27017'),
    AuthModule,
    UserModule,
    LogsModule,
    IdsModule,
    RolesModule,
  ],
  controllers: [],
  providers: [Logger, { provide: APP_FILTER, useClass: AllExceptionFilter }],
  exports: [Logger],
})
export class AppModule {}
