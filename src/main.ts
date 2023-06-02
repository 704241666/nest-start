import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import 'winston-daily-rotate-file';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger,
  });
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  // const httpAdapter = app.get(HttpAdapterHost);
  // 全局的filters 只能有一个
  // app.useGlobalFilters(new AllExceptionFilter(httpAdapter));
  // 全局拦截器
  app.useGlobalPipes(
    new ValidationPipe({
      // 去除在类上不存在的字段，避免被sql注入
      whitelist: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
