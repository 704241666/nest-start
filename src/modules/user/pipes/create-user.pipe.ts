import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
/**
 * 用于自定义转换数据
 */
@Injectable()
export class CreateUserPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}
