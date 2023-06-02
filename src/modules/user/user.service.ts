import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as argon2 from 'argon2';
import { IdsService } from '../ids/ids.service';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly idsService: IdsService,
    private readonly logger: Logger,
  ) {}
  async create(userInfo: Partial<CreateUserDto>): Promise<User> {
    const user = await this.findOneByName(userInfo.username);
    if (user) {
      throw new ConflictException('用户名已存在');
    }
    userInfo.password = await argon2.hash(userInfo.password);
    const Ids = await this.idsService.getIds('user_id');
    userInfo.user_id = Ids;
    const userTemp = await this.userModel.create(userInfo);
    return userTemp;
  }
  async findById(id: string) {
    return await this.userModel.findById(id);
  }
  async find(): Promise<User[]> {
    return this.userModel.find().lean();
  }
  async findOne(dto): Promise<User | any> {
    const { username, password } = dto;
    const user = await this.userModel.findOne({ username }, { __v: 0 }).lean();
    if (user) {
      const isPasswordValid = await argon2.verify(user.password, password);
      if (!isPasswordValid) {
        return {
          code: 500,
          message: '用户名或密码错误',
        };
      } else {
        return user;
      }
    } else {
      return {
        code: 500,
        message: '用户名不存在',
      };
    }
  }
  async findOneByName(username: string): Promise<User | any> {
    const user = await this.userModel.findOne({ username }, { __v: 0 }).lean();
    if (user) {
      return user;
    }
    return null;
  }
  async delete(id: string) {
    return await this.userModel.find({ user_id: id }).exec();
  }
}
