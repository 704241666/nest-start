import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable, map } from 'rxjs';

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    //拦截器执行之前
    return next.handle().pipe(
      map((data) => {
        // 在拦截器执行之后
        return plainToInstance(this.dto, data, {
          //设置为true之后，所有经过该interceptor的接口数据都需要设置Expose或者Exclude
          //Expose 就是设置哪些字段需要暴露，exclude就是设置哪些字段不需要暴露
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
