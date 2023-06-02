import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Logger,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';

import * as config from 'config';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserPipe } from './pipes/create-user.pipe';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuards } from '../../guards/jwt.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly logger: Logger,
    private readonly userService: UserService,
  ) {}
  @Get()
  @UseGuards(JwtGuards)
  async getUsers(): Promise<User[]> {
    return this.userService.find();

    // this.logger.log(config.get(LoggerEnum.LOGGER));
    // this.logger.warn('warn');
    // this.logger.error('error');
  }
  @Get('/getUser/:id')
  @UseGuards(JwtGuards)
  async findUserById(
    @Param('id') id: string,
    //req 中的user 是通过AuthGuard('jwt')中的validate 方法返回的
    // @Req() req,
  ) {
    return this.userService.findById(id);
  }
  @Post('/create')
  async createUser(@Body(CreateUserPipe) userInfo: CreateUserDto) {
    return this.userService.create(userInfo);
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    this.userService.delete(id);
  }
}
