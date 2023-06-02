import {
  Body,
  Catch,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { dbSreverDecorator } from '../../filters/dbserver-filters.filter';
import { RegisterUserDto } from './dto/register-user.dto';
import { CreateUserPipe } from '../user/pipes/create-user.pipe';

import { AuthGuard } from '@nestjs/passport';

import { User } from '../user/entities/user.entity';

import { Exclude, Expose } from 'class-transformer';
import MongooseClassSerializerInterceptor from '../../interceptors/mongoose-class-serializer.interceptor';
import { Serialize } from '../../decorators/serialize.decorator';
import { AdminGuard } from '../../guards/admin.guard';

class LoginDto {
  @Expose()
  username: string;
  @Expose()
  user_id: number;
  @Exclude()
  password: string;
}

@Controller('auth')
// @UseInterceptors(MongooseClassSerializerInterceptor(User)) //将返回的数据进行序列化,剔除掉password
@dbSreverDecorator()
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/login')
  // 装饰器的执行顺序，方法装饰器如果有多个，则从下往上执行
  // @UseGuards(AdminGuard)
  // @UseGuards(AuthGuard('jwt'))

  // 如果使用UseGuard传递多个守卫，则从前往后执行，如果前面的守卫返回false，则后面的守卫不会执行
  // @UseGuards(AuthGuard('jwt'), AdminGuard)
  async login(@Body() dto: any): Promise<{ assess_token: string }> {
    const { username, password } = dto;
    const token = await this.authService.login(username, password);
    return {
      assess_token: token,
    };
  }

  // @Serialize(LoginDto) //将返回的数据进行序列化，只返回username
  @Post('register')
  register(@Body(CreateUserPipe) dto: RegisterUserDto) {
    const { username, password } = dto;
    return this.authService.register(username, password);
  }
}
