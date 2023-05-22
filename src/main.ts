import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import 'winston-daily-rotate-file';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger,
  });
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  // const httpAdapter = app.get(HttpAdapterHost);
  // 全局的filters 只能有一个
  // app.useGlobalFilters(new AllExceptionFilter(httpAdapter));
  await app.listen(3000);
}
bootstrap();
